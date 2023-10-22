//For showing modal for adding a habit

{show &&
    <div className="modal-overlay">    
   <div className='modal'>
       <div className='content'>
           <form onSubmit={handleAddHabit}>
             <label>Enter Title: </label>
             <input type="text"
             onChange={e => setAddedHabit(
               {
                 name: e.target.value,
                 is_completed: false,
                 streak: 0,
                 last_completed_day: "",
                 start_date: new Date().toLocaleDateString("en-US")
                 })}/>
             <input type="submit" />
           </form>
       </div>
       <div>
           <button onClick=
               {() => setShow(false)}>
                   Close
           </button>
       </div>
       </div>
   </div>
     
               }