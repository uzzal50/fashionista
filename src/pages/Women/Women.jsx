import UsePage from '../../hooks/UsePage'
import { Divider } from '../../components'

const Men = () => {
  return (
    <div>
      <Divider />
      <UsePage
        name='women'
        collection='clothes'
        field='category'
        value='women'
      />
    </div>
  )
}

export default Men
