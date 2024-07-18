import { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
  });
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDataId, setCurrentDataId] = useState(null);

  const onSubmitForm = () => {
    // Check filled data
    if (!formData.name || !formData.email || !formData.phone || !formData.gender) {
      setError('Fill all the available form to submit!');
      return;
    }

    // Check the email
    if (!isEditing && users.some(user => user.email === formData.email)) {
      setError('Email is already taken!');
      return;
    }

    if (isEditing) {
      // Update the edited user
      setUsers(users.map(user => user.id === currentDataId ? {...formData, id: currentDataId } : user));
      setIsEditing(false);
      setCurrentDataId(null);
    } else {
      // Input the user
      setUsers([...users, {...formData, id: users.length + 1}]);
    }
    onResetForm();
  }

  const handleEdit = (id) => {
    const user = users.find(user => user.id === id);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
    });
    setIsEditing(true);
    setCurrentDataId(id);
  }

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const onResetForm = (e) => {
    e.preventDefault();
    setFormData({
      name: '',
      email: '',
      phone: '',
      gender: '',
    });
    setError('');
    setIsEditing(false);
    setCurrentDataId(null);
  }

  return (
    <div className="App">
      <div className="content">
        <h1>Users</h1>
        <form onSubmit={onSubmitForm} onReset={onResetForm}>
          {error && <p className="error">{error}</p>}
          <div className="form-group">
            <label>Name:</label>
            <input
              aria-label="name-input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="User Example"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              aria-label="email-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="username@example.com"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              aria-label="phone-input"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="081123123123"
              className="form-control"
            />
          </div>
          <p>Gender:</p>
          <select
            aria-label="gender-input"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="form-control"
          >
            <option value="" disabled>Pick a gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <div className='button-group'>
            <button className='btn btn-secondary' type='reset'>Clear</button>
            <button className='btn btn-secondary' type='submit'>
              {isEditing ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
        <br />
        <table aria-label="table-output">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.gender}</td>
                <td className='action-buttons'>
                  <button className='btn btn-success btn-edit' onClick={() => handleEdit(user.id)}>Edit</button>
                  <button className='btn btn-danger btn-delete' onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
