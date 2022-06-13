from cgi import print_arguments
import pdfplumber
from pychord import Chord
import argparse

def get_pdf(path):
    with pdfplumber.open(path) as pdf:
        first_page = pdf.pages[0]
        print(first_page.chars[0])
    return pdf


def valid_chord(chord_potential):
    try:
        Chord(chord_potential)
        return True
    except ValueError:
        return False


def extract_pages_text(pdf_object): return [pages.extract_text() for pages in pdf_object.pages]


def is_it_chord_line(line_of_chord_or_text: str):
    chords = [text for text in line_of_chord_or_text.split(" ") if valid_chord(text)]
    not_chords = [text for text in line_of_chord_or_text.split(" ") if not valid_chord(text) and text != ""]
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
    pdf_pages = get_pdf(path)
    the_texts = extract_pages_text(pdf_pages)
    newList = transpose_text(the_texts[0], transpose_int)
    return newList


if __name__ == "__main__":
    # arguments, file to transpose and how much steps to transpose
    parser = argparse.ArgumentParser(description='gets text of pdf and transposes if it finds chords in text')
    parser.add_argument('file', metavar='file', type=str, help='enter file location')
    parser.add_argument('transpose', metavar='transpose', type=str, help='by how many semitones do you wanna transpose')
    the_input_args = parser.parse_args()

    output = pdf_transpose(the_input_args.file, int(the_input_args.transpose))
    print(output)

    # if the_input_args.type == "text":
    #     output = transpose_text(the_input_args.text, int(the_input_args.transpose))
    #     print(output)
    # elif the_input_args.type == "pdf":
    #     output = pdf_transpose(path="./"+the_input_args.file, transpose_int=int(the_input_args.transpose))
    #     print(output)
