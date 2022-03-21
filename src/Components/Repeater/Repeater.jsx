

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
    // console.log(tifOptions.repeater_fields);
   
    const newArr = repeaterF.map((r) => (
    //    console.log(r[1])
        r[1]
    ))
    const newArrD = repeaterFD.map((r) => (
        //    console.log(r[1])
            r[1]
        ))
    // const anotherArr = newArr.map((n) => (
    //     console.log(n)
    // ))
    // const anotherArrD = newArrD.map((n) => (
    //     console.log(n)
    // ))
    const filterNewArr = newArr.filter(x => x != undefined)
    const filterNewArrD = newArrD.filter(x => x != undefined)
    
    const finalArr = [filterNewArr[0],filterNewArrD[0]]
    // console.log(finalArr);
    // console.log(inputField);
  return (
    <div>
        <button onClick={(e) => handleAddField(e,finalArr)} className="btn btn-primary ms-3" >Plus</button>             
      
    </div>
  )
}

export default Repeater