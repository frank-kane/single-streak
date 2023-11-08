import 'firebase/firestore';
import 'reactjs-popup/dist/index.css';
import 'react-tabs/style/react-tabs.css';
import { useState } from 'react';

export default function Habits(props) {
    const [hoveredHabits, setHoveredHabits] = useState(Array(props.habits.length).fill(false));

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(today.getDate() - 2);

    function handleHover(index) {
        const updatedHoveredHabits = [...hoveredHabits];
        updatedHoveredHabits[index] = true;
        setHoveredHabits(updatedHoveredHabits);
    }

    function handleHoverExit(index) {
        const updatedHoveredHabits = [...hoveredHabits];
        updatedHoveredHabits[index] = false;
        setHoveredHabits(updatedHoveredHabits);
    }

    return (
        <div className='habits-container'>
            {/* <h6 className='content-title'>Habits</h6> */}
            
                {props.habits.length > 0 ? props.habits.map((habit, index) => (
                    <div key={habit.id} className='habit' onMouseEnter={() => handleHover(index)} onMouseLeave={() => handleHoverExit(index)}>
                        {hoveredHabits[index] &&
                            <img className='remove-button' src='red-x.png' onClick={() => props.deleteHabit(habit.id)} />
                        }
                        <div className='habit-name'>{habit.name}</div>

                        <div className='habit-info'>
                            <img src="fastforward.png" alt="" className='fficon' />
                            <div className='habit-streak'>{habit.streak}</div>
                        </div>
                        <div>{habit.is_completed == false && habit.last_completed <= yesterday ? <img onClick={() => props.completeHabit(habit.id)} className='icon' src="frozen-flame.png" alt="" /> : <img onClick={() => props.completeHabit(habit.id)} className='icon' src="fire.gif" alt="" />}</div>
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
                            <select
                                name="type"
                                value={props.newHabitData.type}
                                onChange={props.handleInputChange}
                            >
                                <option value="strength">Strength</option>
                                <option value="intellect">Intellect</option>
                                <option value="dexterity">Dexterity</option>
                                <option value="wisdom">Wisdom</option>
                                <option value="constitute">Constitute</option>
                                <option value="charisma">Charisma</option>
                            </select>
                        </form>
                        <button onClick={() => props.createNewHabit()}>Create Habit</button>
                        <button onClick={() => props.openOrCloseModal()}>Cancel</button>
                    </div>
                )}

        </div>
    )
}
