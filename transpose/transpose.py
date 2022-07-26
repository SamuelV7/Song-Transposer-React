import pdfplumber
from pychord import Chord
import argparse
import json
import ocr_pdf

def get_pdf(path):
    pdf = pdfplumber.open(path)
    return pdf

def valid_chord(chord_potential):
    try:
        Chord(chord_potential)
        return True
    except ValueError:
        return False

def extract_pages_text(pdf_object): return [
    pages.extract_text() for pages in pdf_object.pages]


def is_it_chord_line(line_of_chord_or_text: str):
    chords = [text for text in line_of_chord_or_text.split(
        " ") if valid_chord(text)]
    not_chords = [text for text in line_of_chord_or_text.split(
        " ") if not valid_chord(text) and text != ""]
    return len(chords) > len(not_chords)


def chord_transpose(chord_in: str, transpose_by: int):
    chord = Chord(chord_in)
    chord.transpose(transpose_by)
    return chord.root


def transpose_chord_line(chord_line: str, transpose: int):
    wrd = chord_line.split(" ")
    return [chord_transpose(maybe_chord, transpose) if valid_chord(maybe_chord) else maybe_chord for maybe_chord in wrd]


def transpose_text(text_string: str, transpose_by: int):
    lines = text_string.split("\n")
    return [" ".join(transpose_chord_line(line, transpose_by)) if is_it_chord_line(line) else line for line in lines]


def pdf_transpose(path: str, transpose_int: int):
    text = ocr_pdf.getText(path)
    newList = transpose_text(text[0], transpose_int)
    return json.dumps(newList)


if __name__ == "__main__":
    # arguments, file to transpose and how much steps to transpose
    parser = argparse.ArgumentParser(
        description='gets text of pdf and transposes if it finds chords in text')
    parser.add_argument('file', metavar='file', type=str,
                        help='enter file location')
    parser.add_argument('transpose', metavar='transpose', type=str,
                        help='by how many semitones do you wanna transpose')
    the_input_args = parser.parse_args()

    output = pdf_transpose(the_input_args.file, int(the_input_args.transpose))
    print(output)
