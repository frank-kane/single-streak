import 'firebase/firestore';
import 'reactjs-popup/dist/index.css';
import 'react-tabs/style/react-tabs.css';

export default function Habits(props) {

    const today = new Date(); // Current date and time
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(today.getDate() - 2);

    return (
        <div className='habits-container'>
            <h1>Habits</h1>
            <div className='all-habits'>
                {props.habits.length > 0 ? props.habits.map((habit) => (

                    <div key={habit.id} className='habit'>
                        <div >
                            <div>{habit.name}</div>
                            <div><img src="fastforward.png" alt="" className='fficon' /></div>
                            <div>{habit.streak}</div>
                            <div>{habit.is_completed == false && habit.last_completed <= yesterday ? <img onClick={() => props.completeHabit(habit.id)} className='icon' src="frozen-flame.png" alt="" /> : <img onClick={() => props.completeHabit(habit.id)} className='icon' src="fire.gif" alt="" />}</div>
                            <div><button onClick={() => props.deleteHabit(habit.id)}>Delete</button></div>
                        </div>
                    </div>
                )) : <div>
                    <h1>No Habits</h1>

                </div>
                }
                {props.habits.length < 7 && <button className='add-habit' onClick={() => props.openOrCloseModal()}>Add Habit</button>}

                {props.isModalOpen && (
                    <div className='new-habit-modal'>
                        <h2>Add a New Habit</h2>
                        <form>
                            <input
                                type="text"
                                name="name"
                                placeholder="Habit name"
                                value={props.newHabitData.name}
                                onChange={props.handleInputChange}
                            />
                            <select name="type" value={props.newHabitData.type} onChange={props.handleInputChange}>
                                <option value="physical">Physical</option>
                                <option value="intellect">Intellect</option>
                                <option value="dexterity">Dexterity</option>
                                <option value="Wisdom">Wisdom</option>
                                <option value="Constitute">Constitute</option>
                                <option value="Charisma">Charisma</option>
                            </select>
                        </form>
                        <button onClick={() => props.createNewHabit()}>Create Habit</button>
                        <button onClick={() => props.openOrCloseModal()}>Cancel</button>
                    </div>
                )}
            </div>









        </div>

    )
}