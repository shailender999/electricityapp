import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteBill, editBillDetail, fetchBillDetail } from "../../api/bills";

const editable = ['amount', 'units', 'paiddate', 'billdate'];
const dateValues = ['paiddate', 'billdate'];

function BillDetails() {
    const { id: billId } = useParams();
    const [bill, setBill] = useState();
    const [editBill, setEditBill] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        editBillDetail(billId, editBill).then(res => console.log(res));
    }
    const handleChange = (e) => {
        e.preventDefault();
        console.log(e);
        setEditBill(prev => {
            return {...prev, [e.target.getAttribute('name')] : e.target.value}
        })
    }
    useEffect(() => {
        fetchBillDetail(billId).then(res => {
            setBill(res);
            setEditBill(res);
        });        
    }, []);
    return ( 
        <div className="row">
            <div className="col-8 m-auto">
                <h4>BillDetails</h4>
                <div className="row">
                    <div className="col-12 bg-light rounded border m-auto">
                        <form onSubmit={handleSubmit} onChange={handleChange}>
                            <fieldset disabled={!isEdit ? 'disabled' : ''}>
                            {
                                bill && Object.entries(bill).map(([key, value]) => (
                                    <div className="d-flex my-1" key={ key }>
                                        <div className="w-50"><b>{ key }</b></div>
                                        <div className="w-50">
                                            <input
                                                type={dateValues.indexOf(key) > -1 ? 'date' : 'text'}
                                                className="input-v1 form-control"
                                                defaultValue={value}
                                                disabled={editable.indexOf(key) > -1 ? '' : 'disabled'}
                                                name={ key }
                                            />
                                        </div>
                                    </div>
                                ))
                                }
                            </fieldset>
                            {
                                isEdit && <div className="text-center">
                                    <button type="submit" className="btn btn-success w-50">Save Changes</button>
                                </div>
                            }
                        </form>
                        <div className="d-flex">
                            <div className="w-50 p-1">
                                {!isEdit ?
                                    <button className="btn btn-primary w-100" onClick={() => setIsEdit(true)}>Edit</button>
                                    : <button className="btn btn-secondary w-100" onClick={() => setIsEdit(false)}>Cancel</button>}
                            </div>
                            <div className="w-50 p-1">
                                <button className="btn btn-danger w-100" onClick={ () => deleteBill(billId)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default BillDetails;