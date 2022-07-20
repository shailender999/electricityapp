import { useState } from "react";
import { addNewBill } from "../api/bills";

let defaultBillFormat = {
    amount: 0,
    units: 0,
    paiddate: '',
    billdate: '',
}
const dateValues = ['paiddate', 'billdate'];
function BillForm() {
    const [editBill, setEditBill] = useState(defaultBillFormat);
    const handleSubmit = (e) => {
        e.preventDefault();
        addNewBill(editBill).then(res => console.log(res));
    }
    const handleChange = (e) => {
        e.preventDefault();
        setEditBill(prev => {
            return {...prev, [e.target.getAttribute('name')] : e.target.value}
        })
    }
    return ( 
        <div className="row">
            <div className="col-12 bg-light rounded border m-auto">
                <form onSubmit={handleSubmit} onChange={handleChange}>
                    <fieldset>
                    {
                        editBill && Object.entries(editBill).map(([key, value]) => (
                            <div className="d-flex my-1" key={ key }>
                                <div className="w-50"><b>{ key }</b></div>
                                <div className="w-50">
                                    <input
                                        type={dateValues.indexOf(key) > -1 ? 'date' : 'text'}
                                        className="input-v1 form-control"
                                        defaultValue={value}
                                        name={ key }
                                    />
                                </div>
                            </div>
                        ))
                        }
                    </fieldset>
                    <div className="text-center">
                        <button type="submit" className="btn btn-success w-50">Add Bill</button>
                    </div>
                </form>
            </div>
        </div>
     );
}

export default BillForm;