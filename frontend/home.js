/*https://chat.openai.com/share/2c87a3f5-5c6f-49ca-93cd-2e317ef1e6d8 conversation to help make delete and update function*/ 
import Character from "./Character.js";




const app = {
  characters: [],
  filteredCharacters: [],

  init: function () {
    app.fetchCharacters();
    // other initialization logic
  },

  fetchCharacters() {
 
    fetch("https://backend-courseproject-marten.onrender.com/characters", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
    })
      .then(response => response.json())
      .then(data => {
        
      
        data.forEach(character => {
          this.characters.push(character);
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        this.showData();
        calldelete();
        callUpdateFavorite();
        this.filterData();
  })
  },
  filterData() {
    app.filteredCharacters = app.characters
    console.log(app.filteredCharacters)
  },
  showData() {
    app.characters.forEach(character => {

      const characterBox = new Character(
        character._id, 
        character.name,
        character.faction,
        character.species,
        character.gender,
        character.ship,
        character.favorite,
        character.costum,
        character.backstory,
        character.inventorName
      );

      document.querySelector(".characters").insertAdjacentHTML('beforeend', characterBox.innerHTML());
    });
  }
};

app.init();

document.querySelector('.all').addEventListener('click',app.init);

async function deleteCharacter(characterId) {
  try {
    const response = await fetch(`https://backend-courseproject-marten.onrender.com/characters_delete/${characterId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete character');
    }

    const result = await response.json();
    
    if (result.success) {
      console.log(`Character with ID ${characterId} successfully deleted.`);
    } else {
      console.log(`Character with ID ${characterId} not found.`);
    }
  } catch (error) {
    console.error('Error deleting character:', error.message);
  }
  app.init
}

function calldelete(){
document.querySelectorAll('.delete').forEach(button => {
  
    button.addEventListener('click', function(event) {
    console.log(event)
    const characterId = this.id;
    deleteCharacter(characterId);
  });
});
}


document.querySelector('.create').addEventListener('click', create);

function create(e) {
  e.preventDefault();
  var targetDiv = document.querySelector('.createBox');
  targetDiv.style.display = 'block';
}

document.querySelector('.hide').addEventListener('click', showCreate);

function showCreate(e) {
  e.preventDefault();
  var targetDiv = document.querySelector('.createBox');
  targetDiv.style.display = 'none';
}

document.querySelector('.register').addEventListener('click', toggleRegister);
document.querySelector('.login').addEventListener('click', toggleLogin);

function toggleRegister(e) {
  e.preventDefault();
  
  let registerBox = document.querySelector('.registerBox');
  if(registerBox.style.display == 'none'){
  registerBox.style.display = 'block';
  }else {
    registerBox.style.display = 'none'
  }
}

function toggleLogin(e) {
  e.preventDefault();
  let loginBox = document.querySelector('.loginBox');
  if(loginBox.style.display == 'none'){
    loginBox.style.display = 'block';
    }else {
      loginBox.style.display = 'none'
    }
}

// form input
let faction = '';
let jedi = document.querySelector('.jediCreate');
let sith = document.querySelector('.sithCreate');
document.querySelector('.jediCreate').addEventListener('click', chooseJedi);

function chooseJedi(e) {
  e.preventDefault();
  faction = 'images/jedi.svg';
  console.log(faction);
  sith.style.opacity = '50%';
  jedi.style.opacity = '100%';
}

document.querySelector('.sithCreate').addEventListener('click', chooseSith);

function chooseSith(e) {
  e.preventDefault();
  faction = 'images/sith.svg';
  console.log(faction);
  jedi.style.opacity = '50%';
  sith.style.opacity = '100%';
}


let gender = 'images/manicon.png'; // Set the default value to 'male'

  document.getElementsByName('gender').forEach(radio => {
    radio.addEventListener('change', chooseGender);
  });

  function chooseGender(event) {
    gender = event.target.value;
    console.log(gender);
  
  }

  document.querySelector('#sexyform').addEventListener('submit', getInput);

  function getInput(event) {
      event.preventDefault(); // Prevent the default form submission behavior

      // Get values from the form inputs
      let name = document.querySelector('#fullName').value;
      let species = document.querySelector('#species').value;
      let ship = document.querySelector('#ship').value;
      let inventor = document.querySelector('#inventorname').value;

      // Log the values to the console 
      console.log('Name:', name);
      console.log('Species:', species);
      console.log('Ship:', ship);
      console.log('Inventor:', inventor);

      fetch('https://backend-courseproject-marten.onrender.com/characters_create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            gender: gender,
            name: name,
            species: species,
            ship: ship,
            inventorName: inventor,
            faction: faction,
            costum: true,
            favorite: false,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // You can handle success response here
        })
        .catch(error => {
            console.error('Error:', error);
            // You can handle errors here
        });
        app.init
  }

  document.querySelector('#registerForm').addEventListener('submit', getRegisterInput);

  function getRegisterInput(event) {
      event.preventDefault(); // Prevent the default form submission behavior

      // Get values from the form inputs
      let mail = document.querySelector('#fullName').value;
      let username = document.querySelector('#species').value;
      let password = document.querySelector('#ship').value;

      // Log the values to the console 

      fetch('https://backend-courseproject-marten.onrender.com/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            mail: mail,
            username: username,
            password: password,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // You can handle success response here
        })
        .catch(error => {
            console.error('Error:', error);
            // You can handle errors here
        });
        app.init
  }

  async function updateFavorite(characterId) {
    try {
      const response = await fetch(`https://backend-courseproject-marten.onrender.com/characters_update/${characterId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to update favorite status');
      }
  
      const result = await response.json();
  
      if (result.success) {
        console.log(`Favorite status updated for character with ID ${characterId}.`);
    
      } else {
        console.log(`Character with ID ${characterId} not found.`);
      }
    } catch (error) {
      console.error('Error updating favorite status:', error.message);
    }
  }
  
  function callUpdateFavorite() {
    document.querySelectorAll('.favorite').forEach(button => {
      button.addEventListener('click', function (event) {
        console.log(event);
        const characterId = this.id;
        updateFavorite(characterId);
      });
    });
  }

  new Cleave('#fullName', {
    blocks: [18],
    delimiter: '',
});

new Cleave('#species', {
  blocks: [18],
  delimiter: ' ',
});

new Cleave('#ship', {
  blocks: [18],
  delimiter: ' ',
});

new Cleave('#inventorname', {
  blocks: [18],
  delimiter: '',
});