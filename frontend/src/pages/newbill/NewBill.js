import BillForm from "../../components/BillForm";

function NewBill() {
    return ( 
        <div className="row">
            <div className="col-8 m-auto">
                <h4>Add New Bill</h4>
                <BillForm />
            </div>
        </div>
     );
}

export default NewBill;