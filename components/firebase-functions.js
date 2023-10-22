



  
  const handleAddHabit = async(e)=>{
    e.preventDefault()
    const docID = localStorage.getItem('user');
    
    const docRef = doc(db, "my-info", props.docID);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data()
    console.log("Added Habit: " + String(addedHabit))

    await updateDoc(docRef, {
      habits: arrayUnion(addedHabit)
    });
    // props.returnEmail(props.my_email)
    // window.location.reload(false);
    setShow(false)
    window.location.reload();
    
  }
  
  
  
  
  export const handleRemoveHabit = async(key)=>{
    console.log("KEY: "+String(key))
    const docRef = doc(db, "my-info", docID);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data()
    const newArray = docData.habits;
    newArray.splice(key, 1); // Remove the item at the specified index
    setMyHabits(newArray)

    console.log("New Array: "+String(newArray))
    // const habitsArray = docData.habits
    await updateDoc(docRef, {
      habits: newArray
  });
  

  }

  export const completeStreak = async(index)=>{
    const userData = localStorage.getItem('user');
    var parsedUserData = {};
    if (userData) {
      // Parse the stored JSON data back into an object
      parsedUserData = JSON.parse(userData);
    }
    console.log("index: " + index);
    console.log("=>" + JSON.stringify(parsedUserData));
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1)
    const docRef = doc(db, "my-info", String(parsedUserData.docID));
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data()
    console.log(docData);
    const habitsArray = docData.habits
    console.log("Habits array: "+habitsArray);
    
    //changiing from true to false
    if (habitsArray[index].is_completed == true){
    console.log("Habit completed: "+habitsArray[index].is_completed)
    habitsArray[index].is_completed = false;
    habitsArray[index].last_completed_day = new Date(yesterday).toLocaleDateString("en-US");
    habitsArray[index].streak = habitsArray[index].streak-1
    console.log("Last COmpleted Type: "+typeof(habitsArray[index].last_completed_day));
    //Update the database
    await updateDoc(docRef, {
        habits: habitsArray,
        'stats.exp':docData.stats.exp -10
    });

    //set habits
    setHabits(habitsArray)
    parsedUserData.habits = habits
    localStorage.setItem('user', JSON.stringify(parsedUserData));
  
    }

    //changiing from false to true
    else if(habitsArray[index].is_completed==false){
    console.log("Habit completed: "+habitsArray[index].is_completed)
    habitsArray[index].is_completed = true;
    habitsArray[index].last_completed_day = new Date(today).toLocaleDateString("en-US");
    habitsArray[index].streak = habitsArray[index].streak+1
    console.log(habitsArray);
    // await docRef.update({ habits: habitsArray});
    await updateDoc(docRef, {
        habits: habitsArray,
        'stats.exp':docData.stats.exp +10
    });
    setHabits(habitsArray)
    parsedUserData.habits = habits
    localStorage.setItem('user', JSON.stringify(parsedUserData));
    


    

    }
    else{
    console.log("Error updating habit")
    }


}