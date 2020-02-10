import React, {Component} from 'react'


export default class Customer extends Component {
    constructor(props){
        super(props)
        this.state = {
            firstName:'',
            lastName:'',
            Address:'',
            Phone:'',
            result:''
            
        }
    }
    
    
    componentDidMount() {
        
    }
    
    
    firstNameChange = (e) => {
        this.setState({firstName:e.target.value})
    }
    
    lastNameChange = (e) => {
        this.setState({lastName:e.target.value})
    }
    
    addressChange = (e) => {
        this.setState({Address:e.target.value})
    }
    
    phoneChange = (e) => {
        this.setState({Phone:e.target.value})
    }    
    
    submitDetails = (e)=> {
        e.preventDefault()
        console.log("click")
        let data = {
            fName:this.state.firstName,
            lName:this.state.lastName,
            customerAddress:this.state.Address,
            customerPhone:this.state.Phone            
        }
        
        
        fetch('http://localhost:8080/saveCustomer', {
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data)
        })
        .then(response=> {
            console.log(response)
            if (response.status === 200){
                return response.json()
            } else {
                console.log("Error in response :", response.status)
                this.setState({result:"Error while saving"})
            }
        })
        .then (data=> {
            console.log("Succcess",data)            
            this.setState({result:"Saved Successfully"})
        })
        .catch(error=>{
            console.log(error)
            this.setState({result:"Error while saving"})            
        })
    }
    

    render(){
        
            console.log("Here")
        return(
        
            <div>
                <form onSubmit={this.submitDetails}>
                    <label >First Name
                    </label>
                    <input type="text" id ="fname" onChange={this.firstNameChange}></input>
                    <label>Last Name
                    </label>
                    <input type="text" id ="lname" onChange={this.lastNameChange}></input>  
                    <label >Address
                    </label>
                    <input type="text" id ="address" onChange={this.addressChange}></input>  
                    <label >Phone
                    </label>
                    <input type="text" id ="phone" onChange={this.phoneChange}></input>
                    <button type="submit">Submit</button>
                </form>
                <p>{this.state.result}</p>
            </div>
        
        )
        
    }
    
    
}