import React, { useState } from 'react'
import { FcTodoList } from 'react-icons/fc';
import { GrFormAdd } from 'react-icons/gr'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { FaRegEdit } from 'react-icons/fa'



const Todo = () => {

    const [inputdata, setinputdata] = useState('');
    const [Add, setAdd] = useState([]);
    const [submit, setsubmit] = useState(true);
    const [edit, setedit] = useState(null);



    const additems = () => {

        if (!inputdata) {
            alert('plzz fill data')
        }else if(inputdata && !submit){
            setAdd(Add.map((elem) => {
                if (elem.id === edit) {
                    return{...elem , name:inputdata}
                }
                return elem
            }))
            setsubmit(true)
            setinputdata('')
            setedit(null)
        }
         else {
            const allinputdata = { id: new Date().getTime().toString(), name: inputdata }
            setAdd([...Add, allinputdata])
            setinputdata('')
        }
    }

    const removeitems = (index) => {
        const remove = Add.filter((el) => {
            return (
                index !== el.id
            )
        })
        setAdd(remove);
    }

    const removeall = () => {
        setAdd([]);
    }

    const edititems = (id) => {
        let newedit = Add.find((el) => {
            return el.id === id
        })
        setsubmit(false)
        setinputdata(newedit.name)
        setedit(id)
    }
    return (
        <>
            <div className='position-absolute top-50 start-50 translate-middle '>
                <div className=' main_div' >
                    <h1>✍🏻 ToDo List ✍🏻</h1>
                    <figure className='m-3'>
                        <FcTodoList style={{ fontSize: '50px' }} />
                        <figcaption className='dic_div my-2'>Add Your List</figcaption>
                    </figure>
                    <div className='m-3 position-relative '>
                        <input className='input_div text-capitalize' type="text" placeholder=' ✍ Add Items...' onChange={(e => setinputdata(e.target.value))} value={inputdata} />
                        {
                            submit ? <GrFormAdd style={{ fontSize: '30px' }} className='add_div' title='Add Itmes' onClick={additems} />:
                            <FaRegEdit style={{ fontSize: '25px' }} title='edit Itmes' className='add_div' onClick={additems} />
                        }
                        
                    </div>
                    <div >
                        {
                            Add.map((el) => {
                                return (
                                    <div key={el.id} className='rem_div text-capitalize position-relative text-start ps-2 my-3 rounded-2 '>
                                        <h5 className='m-1'>{el.name}</h5>
                                        <FaRegEdit style={{ fontSize: '19px' }} className='edit_div' onClick={() => edititems(el.id)} />
                                        <MdOutlineDeleteForever style={{ fontSize: '23px' }} className='delete_div' onClick={() => removeitems(el.id)} />

                                    </div>
                                )
                            })
                        }
                    </div>
                    <div>
                        <button className='btn_div' onClick={removeall}>Remove All</button>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Todo
