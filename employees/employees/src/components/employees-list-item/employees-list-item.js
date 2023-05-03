import './employees-list-item.css';
const EmployeesListItem = (props) => {

    const { name, salary, onDelete, onToggleIncreas, onTogglePromotion
            /*onToggleProp вместо двух*/, increase, promotion } = props;

    let classNames = 'list-group-item d-flex justify-content-between';
    if (increase) {
        classNames += ' increase'
    }
    if (promotion) {
        classNames += ' like'
    }

    return (
        <li className={classNames} >
            <span onClick={onTogglePromotion} className="list-group-item-label">{name}
                {/* data-toggle="promotion" data атрибут*/}
            </span>
            <input type="text" className="list-group-item-input" defaultValue={salary + '$'} />
            <div className='d-flex justify-content-center align-items-center'>
                <button onClick={onToggleIncreas} type="button"
                    className="btn-cookie btn-sm "
                        /* data-toggle="increas" data атрибут*/ >
                    <i className="fas fa-cookie"></i>
                </button>

                <button type="button"
                    className="btn-trash btn-sm "
                    onClick={onDelete}>
                    <i className="fas fa-trash"></i>
                </button>
                <i className="fas fa-star"></i>
            </div>
        </li>
    )


}
export default EmployeesListItem;