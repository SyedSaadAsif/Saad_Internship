import { useState } from 'react';
import developers from './data/developers';
import ProfileCard from './components/profilecard';
import './App.css';

function App() {
  const [filter, setFilter] = useState('all');
  const [developerList, setDeveloperList] = useState(developers);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const filteredDevelopers = filter === 'frontend'
    ? developerList.filter(dev => dev.role.includes('Frontend'))
    : developerList;
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [image, setImage] = useState("");

  const addDeveloper = (event) => {
    event.preventDefault();

    const newDeveloper = {
      id: Date.now(),
      name,
      role,
      skills: skills
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean),
      profileImage: image
    };

    setDeveloperList((currentDevelopers) => [
      ...currentDevelopers,
      newDeveloper,
    ]);

    setName("");
    setRole("");
    setSkills("");
    setImage("");
    setIsFormVisible(false);
  };

  const updateDeveloper = (updatedDeveloper) => {
    setDeveloperList((currentDevelopers) =>
      currentDevelopers.map((developer) =>
        developer.id === updatedDeveloper.id ? updatedDeveloper : developer
      )
    );
  };

  return (
    <div className="container">
      <h1>Developers Profile Card</h1>
      <button className="alldevelopers" onClick={() => setFilter("all")}>All Developers </button>
      <button className="frontend-only" onClick={() => setFilter("frontend")}>Frontend Only</button>
      <button className="add_dev" type="button" onClick={() => setIsFormVisible((visible) => !visible)}>Add Developer</button>
      <div className="add-developer-form">
        {isFormVisible && (
          <form onSubmit={addDeveloper}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            <input
              type="text"
              placeholder="Skills (comma separated)"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
            <input
              type="text"
              placeholder="Profile Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <button type="submit">
              Add Developer
            </button>
          </form>
        )}
      </div>
      <div className="profile-cards">
        {filteredDevelopers.map((dev) => (
          <ProfileCard
            key={dev.id}
            id={dev.id}
            name={dev.name}
            role={dev.role}
            skills={dev.skills}
            image={dev.profileImage}
            onUpdate={updateDeveloper}
          />
        ))}
        </div>
    </div>
  );
}

export default App;
