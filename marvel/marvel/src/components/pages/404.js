import ErrorMessage from "../errorMessage/ErrorMessage"
import { Link } from "react-router-dom"

const Page404 = () => {

return (
    <div>
        <ErrorMessage/>
        <p style={{'textAlign': 'center', 'fontSize': '24px'}}> Вы зашли на несуществующую страницу</p>
        <Link style={{'display': 'block', 'textAlign': 'center'}} to="/">Вернуться назад</Link>
    </div>
)
}
export default Page404;