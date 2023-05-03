import './app-info.css';

const AppInfo = ({increased,employees}) => {

return (
    <div className="app-info">
        <h1>Учет сотрудников в компании BelBet</h1>
        <h2>Общее число сотрудников:{employees}</h2>
        <h2>Премию получают:{increased}</h2>
    </div>
)
}
export default AppInfo;