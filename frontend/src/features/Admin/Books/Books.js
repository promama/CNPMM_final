import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import bookApi from "../../../../src/api/booksApi";
import { useHistory } from "react-router-dom";
import { removeSession } from "../../../utils/auth";
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import axios from 'axios'

export default function Books() {
    const [state, setState] = React.useState({
        columns: [
            { title: "Name", field: "title" },
            { title: "Description", field: "description" },
            { title: "Writer", field: "author" },
            { title: "Price", field: "price" },
        ],
        data: [
        ],
    });

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const history=useHistory();
    useEffect(() => {
        // execute after first render
        (async () => {
            try {
                let params = {
                    // page: 1,
                    // perPage: 2,
                };
                const response = await bookApi.getAll(params);
                setTimeout(()=>{
                    localStorage.clear()
                    window.location.reload();

                    if(response.data===null){
                        history.push("/user/login");
                        removeSession();
                        localStorage.clear()
                    }
                },190000)

                // let action = await getBooksSeller(response);
                // let resDispatch = dispatch(action);
                var books = []
                for (let i = 0; i < response.length; i++) {
                    console.log(response[i])
                    const result = {
                        id:response[i]._id,
                        title: response[i].title,
                        description: response[i].description,
                        author: response[i].author,
                        price: response[i].price 
                    }
                    console.log(result)
                    books.push(result)
                }
                setState({
                    columns: [
                        { title: "Name", field: "title" },
                        { title: "Description", field: "description" },
                        { title: "Writer", field: "author" },
                        { title: "Price", field: "price" },
                    ],
                    data: books
                })
            } catch (error) {
                console.log(`failed post register as ${error}`);
            }
        })();
        return () => {
            // execute when unmount
        };
    }, []);

    function handleSubmit(event) {
        event.preventDefault()
        const datafromSubmit = new FormData(event.target)
        console.log(datafromSubmit.get('description'))   
        axios({
            method: 'POST',
            url: 'http://localhost:3001/api/books/create',
            data: {
                title: datafromSubmit.get('title'),
                description: datafromSubmit.get('description'),
                author: datafromSubmit.get('author'),
                price: datafromSubmit.get('price')
            }})
            .then(response => {
                console.log(response)
                window.location.reload()
            })
    }

    return (
        <div>
            <div>
            <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>Create book</Button>
            <Collapse isOpen={isOpen}>
                <Card>
                    <form onSubmit={handleSubmit}>
                        <input id='title' name='title' style={{width:'150px', height: '30px', borderRadius:'8px', marginRight:'20px'}} type='text' placeholder='Name'></input>
                        <input id='author' name='author' style={{width:'150px', height: '30px', borderRadius:'8px', marginRight:'20px'}} type='text' placeholder='Writer'></input>
                        <input id='price' name='price' style={{width:'150px', height: '30px', borderRadius:'8px'}} type='text' placeholder='Price'></input>
                        <br></br>
                        <br></br>
                        <input id='description' name='description' style={{ width:'490px', height:'30px', borderRadius:'8px'}} type='text' placeholder='Description'></input>
                        <br></br>
                        
                        <br></br>
                        <button style={{width:'140px', height:'40px', background:'#aefeb1', color:'#ef808e', fontSize:'large', fontWeight:'bold', marginLeft:'175px', borderRadius:'12px'}}>Add book</button>
                    </form>
                </Card>
            </Collapse>
            </div>

            <MaterialTable
            options={{
                headerStyle: {
                    backgroundColor: 'cyan',
                    color: 'purple',
                    paddingLeft:"20px",
                    fontSize:'30px'
                },
                rowStyle: {
                    backgroundColor: '#54808e',
                    color:'white',
                    marginLeft:"50px",
                    fontSize:'15px'
                },
                search: false,
                actionsColumnIndex: -1,
                toolbarButtonAlignment:"left"
            }}
            title="Books"
            columns={state.columns}
            data={state.data}
            editable={{
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    
                                    let params ={
                                        _id:newData.id,
                                        author:newData.author,
                                        price:newData.price,
                                        description:newData.description,
                                        title:newData.title
                                    }
                                    const response = bookApi.update(params);
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                let name = oldData.title
                                let params = {
                                    name
                                }
                                const response = bookApi.delete(params)
                                console.log(response)
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
            }}
        />
        </div>
    );
}
