export const navLinkStyles = ({ isActive }) => {
  return {
    borderBottom: isActive ? '1px solid var(--primary)' : '',
    boxSizing: isActive ? 'content-box' : null,
  }
}

export const sidebarStyles = ({ isActive }) => {
  return {
    backgroundColor: isActive ? '#faedeb' : null,
  }
}

export const sideBarlinks = [
  { label: 'Profile', link: 'my-profile' },
  { label: 'Order', link: 'my-order' },
  { label: 'Wishlist', link: 'my-wishlist' },
]

export const optionColors = [
  { label: 'Black', value: 'black' },
  { label: 'White', value: 'white' },
  { label: 'Orange', value: 'orange' },
]

export const capital = word => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export const mainNav = [
  { name: 'buy t-shirts', route: 'shop' },
  { name: 'men', route: 'men' },
  { name: 'women', route: 'women' },
  { name: 'about', route: 'about' },
  { name: 'contact', route: 'about' },
]
