import './skeleton.css'

const SkeletonElement = ({ type }) => {
  const classes = `sk ${type}`

  return <div className={classes}></div>
}

export default SkeletonElement
