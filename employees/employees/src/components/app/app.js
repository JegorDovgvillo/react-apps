import { Component } from 'react';
import './app.css';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';



class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                { name: 'Egor Dovgvillo', salary: 3800, increase: false, id: 1, promotion: true },
                { name: 'Egor Zaprivarin', salary: 550, increase: false, id: 2, promotion: false },
                { name: 'Egor Trish', salary: 1800, increase: true, id: 3, promotion: false },
            ],
            term: '',
            filter: 'all'
        }
        this.maxId = 4;
    }
    deleItem = (id) => {
        this.setState(({ data }) => ({
            // const index = data.findIndex(elem => elem.id == id);
            // const before = data.slice(0, index);
            // const after = data.slice(index + 1);
            // const newArr = [...before,...after];
            data: data.filter(item => item.id != id)
        }))
    }
    addNewItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            promotion: false,
            id: this.maxId++
        }
        this.setState(({ data }) => {
            const newArr = [...data, newItem]

            return {
                data: newArr
            }
        })
    }

    onToggleIncreas = (id) => {
        // this.setState(({data}) => {
        // const index = data.findIndex(item => item.id == id);
        // const old = data[index];
        // const newItem = {...old,increase: !old.increase};
        // const newArr = [...data.slice(0,index),newItem, ...data.slice(index + 1)]
        // return {
        //     data: newArr
        // }
        // })
        this.setState(({ data }) => ({
            data: data.map(item => {
                if (item.id == id) {
                    return { ...item, increase: !item.increase }
                }
                return item
            })
        }))
    }
    //Один метод для increas и promotion
    // onToggleProp = (id,prop) => {
    //     this.setState(({ data }) => ({
    //         data: data.map(item => {
    //             if (item.id == id) {
    //                 return { ...item, [prop]: !item[prop] }
    //             }
    //             return item
    //         })
    //     }))
    // }
    onTogglePromotion = (id) => {
        this.setState(({ data }) => ({
            data: data.map(item => {
                if (item.id == id) {
                    return { ...item, promotion: !item.promotion }
                }
                return item
            })
        }))
    }

    searchEmp = (data, term) => {
        if (term.length == 0) {
            return data;
        }
        return data.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({ term })
    }

    filterPost = (data, filter) => {
        switch (filter) {
            case 'promotion':
                return data.filter(item => item.promotion);
            case 'moreThen1000':
                return data.filter(item => item.salary > 1000);
            default:
                return data
        }
    }

    onFilterSelect = (filter) => {
        this.setState({ filter })
    }

    render() {
        const { data, term, filter } = this.state;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        return (
            <div className='app'>
                <AppInfo
                    employees={employees}
                    increased={increased} />
                <div className="search-panel">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}
                    />
                </div>
                <EmployeesList
                    data={visibleData}
                    onDelete={this.deleItem}
                    onToggleIncreas={this.onToggleIncreas}
                    onTogglePromotion={this.onTogglePromotion} />
                {/* onToggleProp = {this.onToggleProp} этот пропс будет вместо onToggleIncreas и onTogglePromotion*/}
                <EmployeesAddForm
                    addItem={this.addNewItem} />
            </div>
        )
    }

}
export default App;