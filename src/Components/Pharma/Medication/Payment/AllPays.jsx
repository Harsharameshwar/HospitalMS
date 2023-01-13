import React from 'react'
import {Input,SIZE} from 'baseui/input'
import {FormControl} from 'baseui/form-control'


export default function AllPays(props) {

    var initial = {
        n: props?.values?.name,
        c: props?.values?.cost
    }

    const [name,setName] = React.useState(initial.n ? initial.n : '');
    const [cost,setCost] = React.useState(initial.c ? initial.c : '');

    const onAdd = (e) =>{
        e.preventDefault()
        if(name!==undefined && cost !==undefined && name!=='' && cost !=='')
        props.OnAddEntries({id: props.id, name, cost})
        // console.log({id: props.id, name, cost})
    }

  return (
    <form className='flex justify-around flex-wrap items-center' onBlur={onAdd}>
        <div>
            <FormControl label={() => "Name"}>
                <Input
                required
                autoFocus
                id="uid"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                placeholder='Eg: Doctor Fee/Injection'
                clearable
                size={SIZE.compact}
                overrides={{
                    Root: {
                    style: () => ({ borderRadius: "10px", width:'18rem'}),
                    },
                }}
                />
            </FormControl>
        </div>
        <div>
            <FormControl label={() => "Cost"}>
                <Input
                required
                id="uid"
                value={cost}
                type='number'
                pattern='^\d+$'
                min={0.1}
                onChange={(e)=>setCost(e.target.value)}
                placeholder='Eg: 150'
                clearable
                size={SIZE.compact}
                overrides={{
                    Root: {
                    style: () => ({ borderRadius: "10px", width:'18rem'}),
                    },
                }}
                />
            </FormControl>
        </div>
    </form>
  )
}
