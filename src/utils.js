export const navLinkStyles = ({ isActive }) => {
  return {
    opacity: isActive ? '0.6' : '1',
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

export const capital = word => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export const mainNav = [
  { name: 'buy t-shirts', route: 'shop' },
  { name: 'men', route: 'men' },
  { name: 'women', route: 'women' },
  { name: 'about', route: 'about' },
  { name: 'contact', route: 'contact' },
]
