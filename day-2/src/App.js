import { useState, useEffect } from 'react';
import developers from './data/developers';
import ProfileCard from './components/profilecard';
import './App.css';

function App() {
  const [filter, setFilter] = useState('all');
  const [developerList, setDeveloperList] = useState(() => {
  const savedDevelopers =
    localStorage.getItem("developers");

  return savedDevelopers
    ? JSON.parse(savedDevelopers)
    : developers;
});
  useEffect(() => {
  localStorage.setItem(
    "developers",
    JSON.stringify(developerList)
  );
}, [developerList]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isformvalid, setIsFormValid] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  let filteredDevelopers = developerList;
  if (filter === 'frontend') {
    filteredDevelopers = developerList.filter(dev => dev.role.includes('Frontend'));
  }
  else if (filter === 'backend') {
    filteredDevelopers = developerList.filter(dev => dev.role.includes('Backend'));
  } 
  else if(searchTerm.trim() !== '') {
    filteredDevelopers = developerList.filter(dev => 
      dev.name.toLowerCase()===(searchTerm.trim().toLowerCase())
    );
  }
  else {
    filteredDevelopers = developerList;
  }

  const [form, setForm] = useState({
    name: '',
    role: '',
    skills: '',
    profileImage: '',
  });

  const startEdit = (developer) => {
  setEditingId(developer.id);
  setIsFormVisible(true);
  setForm({
    name: developer.name,
    role: developer.role,
    skills: developer.skills.join(', '),
    profileImage: developer.profileImage || developer.image || '',
  });
}
  const saveDeveloper = () => {
  const updatedList =
    developerList.map((developer) =>
      developer.id === editingId
        ? {
            ...developer,
            name: form.name,
            role: form.role,
            skills: form.skills
              .split(',')
              .map((skill) => skill.trim())
              .filter(Boolean),
            profileImage: form.profileImage,
          }
        : developer
    );

  setDeveloperList(updatedList);

  setEditingId(null);

  setForm({
    name: '',
    role: '',
    skills: '',
    profileImage: '',
  });
};
  const deleteDeveloper = (id) => {
  const updatedList =
    developerList.filter(
      (developer) =>
        developer.id !== id
    );

  setDeveloperList(updatedList);
};
  const addDeveloper = (event) => {
    event.preventDefault();
    if(!form.name.trim() || !form.role.trim() || !form.skills.trim()) {
      setIsFormValid(false);
      return;
    }
    const newDeveloper = {
      id: Date.now(),
      name: form.name,
      role: form.role,
      skills: form.skills
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean),
      profileImage: form.profileImage
    };

    setDeveloperList((currentDevelopers) => [
      ...currentDevelopers,
      newDeveloper,
    ]);

    setForm({
      name: '',
      role: '',
      skills: '',
      profileImage: '',
    });
    setIsFormVisible(false);
    setIsFormValid(true);
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
      <h2>
        Total Developers : {filteredDevelopers.length}
      </h2>
      <button className="alldevelopers" onClick={() => setFilter("all")}>All Developers </button>
      <button className="frontend-only" onClick={() => setFilter("frontend")}>Frontend Only</button>
      <button className="backend-only" onClick={() => setFilter("backend")}>Backend Only</button>
      <button className="add_dev" type="button" onClick={() => setIsFormVisible((visible) => !visible || setIsFormValid(true))}>Add Developer</button>
      <button className="search_dev" type="button" onClick={() => setSearchTerm((term) => term ? '' : ' ')}>Search Developer</button>
      {!isformvalid && <p className="error">Please fill in all required fields.</p>}

      {searchTerm && (
        <>
        <input
          type="text"
          placeholder="Search Developer"
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />
        <button type="button" onClick={() => setSearchTerm('')}>
          cancel
        </button>
        </>
      )}

      <div className="add-developer-form">
        {isFormVisible && (
          <form onSubmit={addDeveloper}>
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm((currentForm) => ({
                ...currentForm,
                name: e.target.value,
              }))}
            />
            <input
              type="text"
              placeholder="Role"
              value={form.role}
              onChange={(e) => setForm((currentForm) => ({
                ...currentForm,
                role: e.target.value,
              }))}
            />
            <input
              type="text"
              placeholder="Skills (comma separated)"
              value={form.skills}
              onChange={(e) => setForm((currentForm) => ({
                ...currentForm,
                skills: e.target.value,
              }))}
            />
            <input
              type="text"
              placeholder="Profile Image URL"
              value={form.profileImage}
              onChange={(e) => setForm((currentForm) => ({
                ...currentForm,
                profileImage: e.target.value,
              }))}
            />
            {(!editingId) && (
              <div>
              <button type="submit">
                Add Developer
              </button>
              <button type="button" onClick={() => setIsFormVisible(false) || setForm({
                name: '',
                role: '',
                skills: '',
                profileImage: '',
              })}>
                Cancel
              </button>
              </div>
            )}
            {editingId && (
              <div>
              <button type="button" onClick={() => setIsFormVisible(false) || saveDeveloper()}>
                Save
              </button>
              <button type="button" onClick={() => setIsFormVisible(false) || setEditingId(null) || setForm({
                name: '',
                role: '',
                skills: '',
                profileImage: '',
              })}>
                Cancel
              </button>
              </div>
            )}
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
            onDelete={deleteDeveloper}
            onStartEdit={startEdit}
          />
        ))}
        </div>
    </div>
  );
}

export default App;
