<script lang="ts">
    import { Navbar, NavItem, Nav, NavLink, NavbarBrand } from 'sveltestrap/src'
</script>

<Navbar color='light' light expand='md'>
    <NavbarBrand href="/">GLL Music</NavbarBrand>
    <Nav>
        <NavItem>
            <NavLink href="/songview">Songs List</NavLink>
        </NavItem>
    </Nav>
</Navbar>