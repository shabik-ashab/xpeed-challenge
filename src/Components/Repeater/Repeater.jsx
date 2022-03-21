

const Repeater = ({tifOptions,handleAddField}) => {
 

    // if (!tifOptions) {
    //     return <p>loading</p>;
    //   }
    const repeaterF =  Object.entries(tifOptions?.map(
        (k) =>
        // console.log(k.repeater_fields)
        k?.repeater_fields?.work_place
    ))
    const repeaterFD =  Object.entries(tifOptions?.map(
        (k) =>
        // console.log(k.repeater_fields)
        k?.repeater_fields?.designation
    ))
    const repeat =  Object.entries(tifOptions?.map(
        (k) =>
        // console.log(k)
        // k?.value 
        k
    ))
    // console.log(tifOptions.repeater_fields);
   
    const newArr = repeaterF.map((r) => (
    //    console.log(r[1])
        r[1]
    ))
    const newArrD = repeaterFD.map((r) => (
        //    console.log(r[1])
            r[1]
        ))
        const newArrR = repeat.map((r) => (
            //    console.log(r[1])
                r[1]
            ))  

    const filter = newArrR.filter(x => x.title.toLowerCase() === 'work')        
    const repeaterField = filter[0].value;
    // const anotherArrD = newArrD.map((n) => (
    //     console.log(n)
    // ))
    const filterNewArr = newArr.filter(x => x != undefined)
    const filterNewArrD = newArrD.filter(x => x != undefined)
    // const filterNewArrR = anotherArr.filter(x => x.value !=  )
    
    const finalArr = [filterNewArr[0],filterNewArrD[0]]
  
    // console.log(repeaterField);

  return (
    <div>
        <button onClick={(e) => handleAddField(e,finalArr,repeaterField)} className="btn btn-primary ms-3" >Add</button>             
      
    </div>
  )
}

export default Repeater