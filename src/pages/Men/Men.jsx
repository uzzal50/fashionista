import UsePage from '../../hooks/UsePage'
import { Divider } from '../../components'

const Men = () => {
  return (
    <div>
      <Divider />
      <UsePage name='men' collection='T-shirts' field='category' value='men' />
    </div>
  )
}

export default Men
