import EmployeesListItem from "../employees-list-item/employees-list-item"
import './employees-list.css'


const EmployeesList = ({ data, onDelete, onToggleIncreas, onTogglePromotion/*onToggleProp вместо двух*/ }) => {
    const elements = data.map(item => {
        const { id, ...itemProps } = item
        return (
            <EmployeesListItem
                {...itemProps}
                key={id}
                onDelete={() => onDelete(id)}
                onToggleIncreas={() => onToggleIncreas(id)}
                onTogglePromotion={() => onTogglePromotion(id)}
            /*здесь тоже один проп onToggleProp= {(e) => onToggleProp(id,e.currentTarget.getAttribute('data-toggle'))} */
            />
        )
    })
    return (
        <ul className="app-list list-group" >
            {elements}
        </ul>
    )
}

export default EmployeesList;