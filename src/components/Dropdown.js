import React, { useState, useEffect, useRef } from 'react';

const Dropdown = (props) =>{
    const [open,setOpen] = useState(false);
    const ref = useRef();

    useEffect(()=>{
        const onBodyClick = (event) => {
        if (ref.current.contains(event.target)) {
            return;
        }
        // console.log(event.target);
        setOpen(false);
        };
        document.body.addEventListener('click', onBodyClick);
        return ()=>{  //this function is invoked as sson as dropdown function is removed
            document.body.removeEventListener('click', onBodyClick);  //we remove event listener because after dropdown is hid, ref becomes equal to null. 
        }
    },[]);

    const renderedOptions = props.options.map((option) =>{
        if(option.value === props.selected.value){
            return null;
        }

           return(
            <div 
            key={option.value} 
            className='item'
            onClick={()=>
            {
                props.onSelectedChange(option);   
            }
            }
            >
                {option.label}
            </div>
        );
        
        
    });
    // console.log(ref.current);

    return (
        <div className='ui form' ref={ref}>
            <div className='field'>
                <label className='label'>{props.label} </label>
                <div onClick={()=>{
                    setOpen(!open);
                }} 
                className={`ui selection dropdown ${open? 'visible active' : ''}`}>
                    <i className='dropdown icon'></i>
                    <div className='text'>{props.selected.label}</div>
                    <div className={`menu ${open ? 'visible transition': ''}`}>
                        {renderedOptions}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;