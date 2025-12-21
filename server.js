const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  // Allow reconnection with longer timeouts for phones
  pingTimeout: 60000,
  pingInterval: 25000
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Fun words in English and Spanish (bilingual pairs)
const words = [
  // Animals
  { en: 'Elephant', es: 'Elefante' },
  { en: 'Butterfly', es: 'Mariposa' },
  { en: 'Penguin', es: 'Pingüino' },
  { en: 'Dolphin', es: 'Delfín' },
  { en: 'Giraffe', es: 'Jirafa' },
  { en: 'Turtle', es: 'Tortuga' },
  { en: 'Octopus', es: 'Pulpo' },
  { en: 'Kangaroo', es: 'Canguro' },
  { en: 'Crocodile', es: 'Cocodrilo' },
  { en: 'Flamingo', es: 'Flamingo' },
  
  // Food
  { en: 'Pizza', es: 'Pizza' },
  { en: 'Hamburger', es: 'Hamburguesa' },
  { en: 'Ice Cream', es: 'Helado' },
  { en: 'Spaghetti', es: 'Espagueti' },
  { en: 'Chocolate', es: 'Chocolate' },
  { en: 'Tacos', es: 'Tacos' },
  { en: 'Pancakes', es: 'Panqueques' },
  { en: 'Watermelon', es: 'Sandía' },
  { en: 'Popcorn', es: 'Palomitas' },
  { en: 'Banana', es: 'Plátano' },
  
  // Places
  { en: 'Beach', es: 'Playa' },
  { en: 'Hospital', es: 'Hospital' },
  { en: 'Airport', es: 'Aeropuerto' },
  { en: 'Library', es: 'Biblioteca' },
  { en: 'Museum', es: 'Museo' },
  { en: 'Stadium', es: 'Estadio' },
  { en: 'Restaurant', es: 'Restaurante' },
  { en: 'Church', es: 'Iglesia' },
  { en: 'School', es: 'Escuela' },
  { en: 'Park', es: 'Parque' },
  
  // Objects
  { en: 'Umbrella', es: 'Paraguas' },
  { en: 'Television', es: 'Televisión' },
  { en: 'Refrigerator', es: 'Refrigerador' },
  { en: 'Scissors', es: 'Tijeras' },
  { en: 'Mirror', es: 'Espejo' },
  { en: 'Pillow', es: 'Almohada' },
  { en: 'Candle', es: 'Vela' },
  { en: 'Guitar', es: 'Guitarra' },
  { en: 'Camera', es: 'Cámara' },
  { en: 'Bicycle', es: 'Bicicleta' },
  
  // Professions
  { en: 'Doctor', es: 'Doctor' },
  { en: 'Firefighter', es: 'Bombero' },
  { en: 'Teacher', es: 'Maestro' },
  { en: 'Astronaut', es: 'Astronauta' },
  { en: 'Chef', es: 'Chef' },
  { en: 'Pilot', es: 'Piloto' },
  { en: 'Dentist', es: 'Dentista' },
  { en: 'Police', es: 'Policía' },
  { en: 'Singer', es: 'Cantante' },
  { en: 'Mechanic', es: 'Mecánico' },
  
  // Actions/Activities
  { en: 'Swimming', es: 'Nadar' },
  { en: 'Dancing', es: 'Bailar' },
  { en: 'Cooking', es: 'Cocinar' },
  { en: 'Sleeping', es: 'Dormir' },
  { en: 'Running', es: 'Correr' },
  { en: 'Singing', es: 'Cantar' },
  { en: 'Painting', es: 'Pintar' },
  { en: 'Reading', es: 'Leer' },
  { en: 'Shopping', es: 'Comprar' },
  { en: 'Fishing', es: 'Pescar' },
  
  // Nature
  { en: 'Mountain', es: 'Montaña' },
  { en: 'Rainbow', es: 'Arcoíris' },
  { en: 'Volcano', es: 'Volcán' },
  { en: 'Waterfall', es: 'Cascada' },
  { en: 'Forest', es: 'Bosque' },
  { en: 'Desert', es: 'Desierto' },
  { en: 'Ocean', es: 'Océano' },
  { en: 'Island', es: 'Isla' },
  { en: 'Thunder', es: 'Trueno' },
  { en: 'Sunrise', es: 'Amanecer' },
  
  // Christmas (some festive ones!)
  { en: 'Snowman', es: 'Muñeco de Nieve' },
  { en: 'Reindeer', es: 'Reno' },
  { en: 'Christmas Tree', es: 'Árbol de Navidad' },
  { en: 'Santa Claus', es: 'Santa Claus' },
  { en: 'Presents', es: 'Regalos' },
  { en: 'Fireplace', es: 'Chimenea' },
  { en: 'Snowflake', es: 'Copo de Nieve' },
  { en: 'Candy Cane', es: 'Bastón de Caramelo' },
  { en: 'Gingerbread', es: 'Galleta de Jengibre' },
  { en: 'Hot Chocolate', es: 'Chocolate Caliente' },
  
  // Fun/Random
  { en: 'Superhero', es: 'Superhéroe' },
  { en: 'Pirate', es: 'Pirata' },
  { en: 'Wizard', es: 'Mago' },
  { en: 'Robot', es: 'Robot' },
  { en: 'Dinosaur', es: 'Dinosaurio' },
  { en: 'Mermaid', es: 'Sirena' },
  { en: 'Ghost', es: 'Fantasma' },
  { en: 'Vampire', es: 'Vampiro' },
  { en: 'Alien', es: 'Extraterrestre' },
  { en: 'Dragon', es: 'Dragón' },
  
  // HARD/DIFFICULT WORDS
  { en: 'Déjà vu', es: 'Déjà vu' },
  { en: 'Procrastination', es: 'Procrastinación' },
  { en: 'Photosynthesis', es: 'Fotosíntesis' },
  { en: 'Constellation', es: 'Constelación' },
  { en: 'Hieroglyphics', es: 'Jeroglíficos' },
  { en: 'Ventriloquist', es: 'Ventrílocuo' },
  { en: 'Claustrophobia', es: 'Claustrofobia' },
  { en: 'Archaeology', es: 'Arqueología' },
  { en: 'Metamorphosis', es: 'Metamorfosis' },
  { en: 'Hallucination', es: 'Alucinación' },
  { en: 'Superstition', es: 'Superstición' },
  { en: 'Hibernation', es: 'Hibernación' },
  { en: 'Silhouette', es: 'Silueta' },
  { en: 'Camouflage', es: 'Camuflaje' },
  { en: 'Quicksand', es: 'Arenas Movedizas' },
  { en: 'Guillotine', es: 'Guillotina' },
  { en: 'Hypnosis', es: 'Hipnosis' },
  { en: 'Telepathy', es: 'Telepatía' },
  { en: 'Acrobat', es: 'Acróbata' },
  { en: 'Labyrinth', es: 'Laberinto' },
  { en: 'Origami', es: 'Origami' },
  { en: 'Limousine', es: 'Limusina' },
  { en: 'Chandelier', es: 'Candelabro' },
  { en: 'Scarecrow', es: 'Espantapájaros' },
  { en: 'Chameleon', es: 'Camaleón' },
  { en: 'Kaleidoscope', es: 'Caleidoscopio' },
  { en: 'Saxophone', es: 'Saxofón' },
  { en: 'Marionette', es: 'Marioneta' },
  { en: 'Avalanche', es: 'Avalancha' },
  { en: 'Bankruptcy', es: 'Bancarrota' },
  { en: 'Conspiracy', es: 'Conspiración' },
  { en: 'Exorcism', es: 'Exorcismo' },
  { en: 'Paparazzi', es: 'Paparazzi' },
  { en: 'Plagiarism', es: 'Plagio' },
  { en: 'Sarcasm', es: 'Sarcasmo' }
];

// Game state
let gameState = {
  players: {},           // { odId: { odI, odentifierId, name, isReady, isHost, role, hasVoted, votedFor, lastSeen } }
  playerOrder: [],       // Array of socket IDs in join order
  hostId: null,
  phase: 'lobby',        // 'lobby', 'playing', 'voting', 'results'
  secretWord: null,      // { en: 'word', es: 'palabra' }
  imposterId: null,      // Single impostor (backwards compat)
  impostorIds: [],       // Array of impostor IDs (for 2+ impostors)
  votes: {},             // { votedPlayerName: count }
  votedCorrectly: null,  // true/false after vote results
  
  // For reconnection support
  playersByIdentifier: {}, // { odentifierId: socketId }
  
  // Track last impostor to avoid repeats
  lastImpostorNames: []  // Names of impostors from last round
};

// Disconnected players waiting to reconnect (give them 5 minutes)
let disconnectedPlayers = {}; // { odentifierId: { playerData, odisconnectTime } }

const RECONNECT_TIMEOUT = 5 * 60 * 1000; // 5 minutes to reconnect

function cleanupDisconnectedPlayers() {
  const now = Date.now();
  for (const [identifier, data] of Object.entries(disconnectedPlayers)) {
    if (now - data.disconnectTime > RECONNECT_TIMEOUT) {
      console.log(`Removing disconnected player ${data.playerData.name} (timeout)`);
      delete disconnectedPlayers[identifier];
    }
  }
}

// Run cleanup every minute
setInterval(cleanupDisconnectedPlayers, 60000);

function resetGame() {
  gameState = {
    players: {},
    playerOrder: [],
    hostId: null,
    phase: 'lobby',
    secretWord: null,
    imposterId: null,
    impostorIds: [],
    votes: {},
    votedCorrectly: null,
    playersByIdentifier: {},
    lastImpostorNames: []
  };
  disconnectedPlayers = {};
}

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function broadcastGameState() {
  // Send personalized state to each player
  for (const [socketId, player] of Object.entries(gameState.players)) {
    const playerList = gameState.playerOrder.map(id => {
      const p = gameState.players[id];
      if (!p) return null;
      return {
        name: p.name,
        isReady: p.isReady,
        isHost: p.isHost,
        hasVoted: p.hasVoted,
        isDisconnected: false
      };
    }).filter(p => p !== null);

    // Add disconnected players to the list
    for (const [identifier, data] of Object.entries(disconnectedPlayers)) {
      playerList.push({
        name: data.playerData.name,
        isReady: data.playerData.isReady,
        isHost: false,
        hasVoted: data.playerData.hasVoted,
        isDisconnected: true
      });
    }

    // Determine if we should show the secret word
    // Show to non-impostors during playing/voting, show to EVERYONE in results if impostor was caught
    let showSecretWord = null;
    if (gameState.phase !== 'lobby') {
      if (gameState.phase === 'results' && gameState.votedCorrectly) {
        // Impostor was caught - reveal word to everyone including the impostor
        showSecretWord = gameState.secretWord;
      } else if (player.role !== 'impostor') {
        // During game, only non-impostors see the word
        showSecretWord = gameState.secretWord;
      }
    }

    const personalState = {
      phase: gameState.phase,
      players: playerList,
      isHost: player.isHost,
      myName: player.name,
      role: gameState.phase !== 'lobby' ? player.role : null,
      secretWord: showSecretWord,
      votes: gameState.phase === 'results' ? gameState.votes : null,
      votedCorrectly: gameState.votedCorrectly,
      imposterName: gameState.phase === 'results' ? gameState.players[gameState.imposterId]?.name || disconnectedPlayers[Object.keys(disconnectedPlayers).find(k => disconnectedPlayers[k].wasImpostor)]?.playerData.name : null
    };

    io.to(socketId).emit('gameState', personalState);
  }
  
  // Also update host dashboards
  broadcastHostState();
}

// Track host dashboard connections
let hostDashboards = new Set();

function getHostState() {
  const playerList = gameState.playerOrder.map(id => {
    const p = gameState.players[id];
    if (!p) return null;
    return {
      name: p.name,
      isReady: p.isReady,
      isImpostor: id === gameState.imposterId,
      hasVoted: p.hasVoted,
      isDisconnected: false
    };
  }).filter(p => p !== null);

  // Add disconnected players (but not too many old ones)
  for (const [identifier, data] of Object.entries(disconnectedPlayers)) {
    playerList.push({
      name: data.playerData.name,
      isReady: data.playerData.isReady,
      isImpostor: data.wasImpostor,
      hasVoted: data.playerData.hasVoted,
      isDisconnected: true
    });
  }

  return {
    phase: gameState.phase,
    players: playerList,
    secretWord: gameState.secretWord,
    impostorName: gameState.imposterId ? gameState.players[gameState.imposterId]?.name : null,
    votes: gameState.votes,
    votedCorrectly: gameState.votedCorrectly
  };
}

function broadcastHostState() {
  const hostState = getHostState();
  console.log(`Broadcasting to ${hostDashboards.size} host dashboards, ${hostState.players.length} players`);
  
  // Send to all host dashboards
  for (const hostId of hostDashboards) {
    io.to(hostId).emit('hostState', hostState);
  }
}

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Host dashboard connection
  socket.on('hostJoin', () => {
    console.log('Host dashboard connected:', socket.id);
    hostDashboards.add(socket.id);
    // Send current state directly to this host dashboard
    const playerList = gameState.playerOrder.map(id => {
      const p = gameState.players[id];
      if (!p) return null;
      return {
        name: p.name,
        isReady: p.isReady,
        isImpostor: id === gameState.imposterId,
        hasVoted: p.hasVoted,
        isDisconnected: false
      };
    }).filter(p => p !== null);

    // Add disconnected players
    for (const [identifier, data] of Object.entries(disconnectedPlayers)) {
      playerList.push({
        name: data.playerData.name,
        isReady: data.playerData.isReady,
        isImpostor: data.wasImpostor,
        hasVoted: data.playerData.hasVoted,
        isDisconnected: true
      });
    }

    const hostState = {
      phase: gameState.phase,
      players: playerList,
      secretWord: gameState.secretWord,
      impostorName: gameState.imposterId ? gameState.players[gameState.imposterId]?.name : null,
      votes: gameState.votes,
      votedCorrectly: gameState.votedCorrectly
    };
    
    socket.emit('hostState', hostState);
    console.log('Sent host state with', playerList.length, 'players');
  });

  // Host dashboard controls
  socket.on('hostGenerate', () => {
    if (!hostDashboards.has(socket.id)) return;
    
    const players = Object.values(gameState.players);
    if (players.length < 3) {
      socket.emit('error', 'Need at least 3 players to start!');
      return;
    }
    
    const allReady = players.every(p => p.isReady);
    if (!allReady) {
      socket.emit('error', 'All players must be ready!');
      return;
    }

    // Determine number of impostors (2 if more than 10 players)
    const numImpostors = players.length > 10 ? 2 : 1;
    
    // Get player names
    const allPlayerNames = gameState.playerOrder.map(id => gameState.players[id].name);
    
    // Filter out last round's impostors if possible (to avoid repeats)
    let eligibleNames = allPlayerNames.filter(name => !gameState.lastImpostorNames.includes(name));
    
    // If not enough eligible players (e.g., only 2-3 players), allow all
    if (eligibleNames.length < numImpostors) {
      eligibleNames = allPlayerNames;
    }
    
    // Better random shuffle using Fisher-Yates
    for (let i = eligibleNames.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [eligibleNames[i], eligibleNames[j]] = [eligibleNames[j], eligibleNames[i]];
    }
    
    // Select impostors
    const selectedNames = eligibleNames.slice(0, numImpostors);
    gameState.impostorIds = selectedNames.map(name => 
      gameState.playerOrder.find(id => gameState.players[id].name === name)
    );
    gameState.imposterId = gameState.impostorIds[0]; // Keep for backwards compatibility
    
    // Remember these impostors for next round
    gameState.lastImpostorNames = selectedNames;
    
    // Select random word
    gameState.secretWord = getRandomWord();
    
    // Assign roles
    for (const id of gameState.playerOrder) {
      gameState.players[id].role = gameState.impostorIds.includes(id) ? 'impostor' : 'player';
    }

    gameState.phase = 'playing';
    console.log(`[HOST] Game started! Impostor(s): ${selectedNames.join(', ')}, Word: ${gameState.secretWord.en}`);
    broadcastGameState();
    broadcastHostState();
  });

  socket.on('hostStartVote', () => {
    if (!hostDashboards.has(socket.id)) return;
    if (gameState.phase !== 'playing') return;

    gameState.phase = 'voting';
    for (const id of gameState.playerOrder) {
      if (gameState.players[id]) {
        gameState.players[id].hasVoted = false;
        gameState.players[id].votedFor = null;
      }
    }
    gameState.votes = {};
    
    broadcastGameState();
    broadcastHostState();
  });

  socket.on('hostContinue', () => {
    if (!hostDashboards.has(socket.id)) return;
    if (gameState.phase !== 'results') return;
    if (gameState.votedCorrectly) return;

    gameState.phase = 'playing';
    for (const id of gameState.playerOrder) {
      if (gameState.players[id]) {
        gameState.players[id].hasVoted = false;
        gameState.players[id].votedFor = null;
      }
    }
    gameState.votes = {};
    gameState.votedCorrectly = null;
    
    broadcastGameState();
    broadcastHostState();
  });

  socket.on('hostNewGame', () => {
    if (!hostDashboards.has(socket.id)) return;

    gameState.phase = 'lobby';
    gameState.secretWord = null;
    gameState.imposterId = null;
    gameState.votes = {};
    gameState.votedCorrectly = null;
    disconnectedPlayers = {};
    
    for (const id of gameState.playerOrder) {
      if (gameState.players[id]) {
        gameState.players[id].isReady = false;
        gameState.players[id].role = null;
        gameState.players[id].hasVoted = false;
        gameState.players[id].votedFor = null;
      }
    }
    
    broadcastGameState();
    broadcastHostState();
  });

  socket.on('hostReset', () => {
    if (!hostDashboards.has(socket.id)) return;
    
    resetGame();
    io.emit('reset');
    broadcastHostState();
  });

  // Clear only offline/disconnected players
  socket.on('hostClearOffline', () => {
    if (!hostDashboards.has(socket.id)) return;
    
    console.log('Clearing all offline players');
    disconnectedPlayers = {};
    broadcastGameState();
  });

  // Remove a specific player
  socket.on('hostKickPlayer', (playerName) => {
    if (!hostDashboards.has(socket.id)) return;
    
    // Find and remove player by name
    for (const [socketId, player] of Object.entries(gameState.players)) {
      if (player.name === playerName) {
        console.log(`Host kicking player: ${playerName}`);
        delete gameState.players[socketId];
        delete gameState.playersByIdentifier[player.identifier];
        gameState.playerOrder = gameState.playerOrder.filter(id => id !== socketId);
        io.to(socketId).emit('kicked');
        break;
      }
    }
    
    // Also check disconnected players
    for (const [identifier, data] of Object.entries(disconnectedPlayers)) {
      if (data.playerData.name === playerName) {
        delete disconnectedPlayers[identifier];
        break;
      }
    }
    
    broadcastGameState();
  });

  // Handle reconnection
  socket.on('reconnect_attempt', (identifier, name) => {
    console.log(`Reconnection attempt from ${name} with identifier ${identifier}`);
    
    if (disconnectedPlayers[identifier]) {
      // Player is reconnecting!
      const oldData = disconnectedPlayers[identifier];
      console.log(`Player ${name} reconnected!`);
      
      // Restore player data with new socket ID
      gameState.players[socket.id] = {
        ...oldData.playerData,
        identifier: identifier
      };
      
      gameState.playerOrder.push(socket.id);
      gameState.playersByIdentifier[identifier] = socket.id;
      
      // If they were the impostor, update the reference
      if (oldData.wasImpostor) {
        gameState.imposterId = socket.id;
      }
      
      // If they were host and no new host was assigned
      if (oldData.playerData.isHost && !gameState.hostId) {
        gameState.hostId = socket.id;
        gameState.players[socket.id].isHost = true;
      }
      
      delete disconnectedPlayers[identifier];
      
      socket.emit('reconnected', { success: true });
      broadcastGameState();
    } else {
      // No saved session, need to join fresh
      socket.emit('reconnected', { success: false });
    }
  });

  socket.on('join', (data) => {
    const { name, identifier } = data;
    
    if (!name || name.trim() === '') return;
    
    const trimmedName = name.trim();
    
    console.log(`Join attempt: ${trimmedName} with identifier ${identifier}`);
    
    // Check if this identifier is already connected with a DIFFERENT socket
    const existingSocketId = gameState.playersByIdentifier[identifier];
    if (existingSocketId && existingSocketId !== socket.id) {
      // Same device reconnecting - remove old connection and let them rejoin
      console.log(`Same device reconnecting, removing old socket ${existingSocketId}`);
      const oldPlayer = gameState.players[existingSocketId];
      if (oldPlayer) {
        delete gameState.players[existingSocketId];
        gameState.playerOrder = gameState.playerOrder.filter(id => id !== existingSocketId);
        delete gameState.playersByIdentifier[identifier];
      }
    }
    
    // Check if this player was disconnected and is trying to rejoin
    if (disconnectedPlayers[identifier]) {
      // Same device trying to rejoin - allow them back!
      const oldData = disconnectedPlayers[identifier];
      console.log(`Player ${trimmedName} rejoining from disconnected (was ${oldData.playerData.name})`);
      
      // Restore player data with new socket ID (use new name if they changed it)
      gameState.players[socket.id] = {
        ...oldData.playerData,
        name: trimmedName,
        identifier: identifier,
        isReady: false // Reset ready status for new game
      };
      
      gameState.playerOrder.push(socket.id);
      gameState.playersByIdentifier[identifier] = socket.id;
      
      // If they were the impostor, update the reference
      if (oldData.wasImpostor && gameState.phase !== 'lobby') {
        gameState.imposterId = socket.id;
      }
      
      // Check if we need a host
      if (!gameState.hostId || gameState.playerOrder.length === 1) {
        gameState.hostId = socket.id;
        gameState.players[socket.id].isHost = true;
      }
      
      delete disconnectedPlayers[identifier];
      broadcastGameState();
      return;
    }
    
    // Check if name already exists (by someone else on a DIFFERENT device)
    const nameExistsOnOtherDevice = Object.values(gameState.players).some(p => 
      p.name.toLowerCase() === trimmedName.toLowerCase() && 
      p.identifier !== identifier
    );
    const nameInDisconnectedOtherDevice = Object.values(disconnectedPlayers).some(d => 
      d.playerData.name.toLowerCase() === trimmedName.toLowerCase() && 
      d.playerData.identifier !== identifier
    );
    
    if (nameExistsOnOtherDevice || nameInDisconnectedOtherDevice) {
      socket.emit('error', 'Name already taken! Choose another. / ¡Nombre ya tomado!');
      return;
    }

    const isHost = gameState.playerOrder.length === 0 && Object.keys(disconnectedPlayers).length === 0;
    
    gameState.players[socket.id] = {
      name: trimmedName,
      identifier: identifier,
      isReady: false,
      isHost: isHost,
      role: null,
      hasVoted: false,
      votedFor: null
    };
    
    gameState.playerOrder.push(socket.id);
    gameState.playersByIdentifier[identifier] = socket.id;
    
    if (isHost) {
      gameState.hostId = socket.id;
    }

    console.log(`${trimmedName} joined. Host: ${isHost}`);
    broadcastGameState();
  });

  socket.on('ready', () => {
    if (gameState.players[socket.id]) {
      gameState.players[socket.id].isReady = true;
      broadcastGameState();
    }
  });

  socket.on('unready', () => {
    if (gameState.players[socket.id]) {
      gameState.players[socket.id].isReady = false;
      broadcastGameState();
    }
  });

  // Player wants to EXIT the game completely
  socket.on('exitGame', () => {
    const player = gameState.players[socket.id];
    if (!player) return;
    
    console.log(`Player ${player.name} is exiting the game`);
    
    const wasHost = player.isHost;
    const identifier = player.identifier;
    
    // Remove from active players completely (don't save to disconnected)
    delete gameState.players[socket.id];
    delete gameState.playersByIdentifier[identifier];
    gameState.playerOrder = gameState.playerOrder.filter(id => id !== socket.id);
    
    // Also remove from disconnected if they were there
    delete disconnectedPlayers[identifier];
    
    // If they were the impostor during a game, the game needs to handle this
    if (socket.id === gameState.imposterId) {
      gameState.imposterId = null;
    }

    // If host left, assign new host
    if (wasHost && gameState.playerOrder.length > 0) {
      const newHostId = gameState.playerOrder[0];
      gameState.hostId = newHostId;
      gameState.players[newHostId].isHost = true;
      console.log(`New host assigned: ${gameState.players[newHostId].name}`);
    } else if (wasHost) {
      gameState.hostId = null;
    }

    // Clear player's localStorage identifier by sending them back to join screen
    socket.emit('exitComplete');
    
    broadcastGameState();
  });

  socket.on('generate', () => {
    // Only host can generate
    if (socket.id !== gameState.hostId) return;
    
    // Need at least 3 players and all must be ready
    const players = Object.values(gameState.players);
    if (players.length < 3) {
      socket.emit('error', 'Need at least 3 players to start!');
      return;
    }
    
    const allReady = players.every(p => p.isReady);
    if (!allReady) {
      socket.emit('error', 'All players must be ready!');
      return;
    }

    // Select random impostor
    const randomIndex = Math.floor(Math.random() * gameState.playerOrder.length);
    gameState.imposterId = gameState.playerOrder[randomIndex];
    
    // Select random word (bilingual)
    gameState.secretWord = getRandomWord();
    
    // Assign roles
    for (const id of gameState.playerOrder) {
      gameState.players[id].role = id === gameState.imposterId ? 'impostor' : 'player';
    }

    gameState.phase = 'playing';
    console.log(`Game started! Impostor: ${gameState.players[gameState.imposterId].name}, Word: ${gameState.secretWord.en}`);
    broadcastGameState();
  });

  socket.on('startVote', () => {
    // Only host can start voting
    if (socket.id !== gameState.hostId) return;
    if (gameState.phase !== 'playing') return;

    gameState.phase = 'voting';
    // Reset vote states
    for (const id of gameState.playerOrder) {
      if (gameState.players[id]) {
        gameState.players[id].hasVoted = false;
        gameState.players[id].votedFor = null;
      }
    }
    gameState.votes = {};
    
    broadcastGameState();
  });

  socket.on('vote', (votedName) => {
    if (gameState.phase !== 'voting') return;
    if (!gameState.players[socket.id]) return;
    if (gameState.players[socket.id].hasVoted) return;

    // Handle skip vote
    if (votedName === 'SKIP') {
      gameState.players[socket.id].hasVoted = true;
      gameState.players[socket.id].votedFor = 'SKIP';
      // Skip votes don't count toward anyone
    } else {
      // Can't vote for yourself
      if (gameState.players[socket.id].name.toLowerCase() === votedName.toLowerCase()) {
        socket.emit('error', 'You cannot vote for yourself! / ¡No puedes votar por ti mismo!');
        return;
      }

      // Validate voted name exists (including disconnected players)
      const votedPlayer = Object.values(gameState.players).find(p => p.name.toLowerCase() === votedName.toLowerCase());
      const votedDisconnected = Object.values(disconnectedPlayers).find(d => d.playerData.name.toLowerCase() === votedName.toLowerCase());
      
      if (!votedPlayer && !votedDisconnected) {
        socket.emit('error', 'Player not found!');
        return;
      }

      const actualName = votedPlayer ? votedPlayer.name : votedDisconnected.playerData.name;
      
      gameState.players[socket.id].hasVoted = true;
      gameState.players[socket.id].votedFor = actualName;
      gameState.votes[actualName] = (gameState.votes[actualName] || 0) + 1;
    }

    // Check if everyone has voted (only connected players need to vote)
    const allVoted = Object.values(gameState.players).every(p => p.hasVoted);
    
    if (allVoted) {
      // Calculate results - get all impostor names
      const impostorNames = (gameState.impostorIds || [gameState.imposterId])
        .map(id => gameState.players[id]?.name)
        .filter(name => name);
      
      console.log('[VOTE] Impostor names:', impostorNames);
      console.log('[VOTE] All votes:', gameState.votes);
      
      let maxVotes = 0;
      let topVoted = null;

      for (const [name, count] of Object.entries(gameState.votes)) {
        if (count > maxVotes) {
          maxVotes = count;
          topVoted = name;
        }
      }

      console.log('[VOTE] Top voted:', topVoted, 'with', maxVotes, 'votes');

      // Check if top voted is ANY of the impostors (case-insensitive)
      const topVotedLower = topVoted?.toLowerCase();
      const isImpostor = impostorNames.some(name => name.toLowerCase() === topVotedLower);
      
      console.log('[VOTE] Is impostor?', isImpostor);
      
      gameState.votedCorrectly = isImpostor;
      gameState.phase = 'results';
    }

    broadcastGameState();
  });

  socket.on('continueGame', () => {
    // Only host can continue
    if (socket.id !== gameState.hostId) return;
    if (gameState.phase !== 'results') return;
    
    // Can only continue if they guessed wrong
    if (gameState.votedCorrectly) return;

    gameState.phase = 'playing';
    for (const id of gameState.playerOrder) {
      if (gameState.players[id]) {
        gameState.players[id].hasVoted = false;
        gameState.players[id].votedFor = null;
      }
    }
    gameState.votes = {};
    gameState.votedCorrectly = null;
    
    broadcastGameState();
  });

  socket.on('newGame', () => {
    // Only host can start new game
    if (socket.id !== gameState.hostId) return;

    // Reset to lobby but keep players
    gameState.phase = 'lobby';
    gameState.secretWord = null;
    gameState.imposterId = null;
    gameState.votes = {};
    gameState.votedCorrectly = null;
    
    // Clear disconnected players so they can rejoin fresh
    disconnectedPlayers = {};
    
    for (const id of gameState.playerOrder) {
      if (gameState.players[id]) {
        gameState.players[id].isReady = false;
        gameState.players[id].role = null;
        gameState.players[id].hasVoted = false;
        gameState.players[id].votedFor = null;
      }
    }
    
    broadcastGameState();
  });

  socket.on('resetAll', () => {
    // Only host can reset everything
    if (socket.id !== gameState.hostId) return;
    
    resetGame();
    io.emit('reset');
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    
    // Check if it's a host dashboard
    if (hostDashboards.has(socket.id)) {
      hostDashboards.delete(socket.id);
      console.log('Host dashboard disconnected');
      return;
    }
    
    const player = gameState.players[socket.id];
    if (!player) return;
    
    const wasHost = player.isHost;
    const wasImpostor = socket.id === gameState.imposterId;
    const identifier = player.identifier;
    
    // Save player data for potential reconnection
    disconnectedPlayers[identifier] = {
      playerData: { ...player },
      disconnectTime: Date.now(),
      wasImpostor: wasImpostor
    };
    
    // Remove from active players
    delete gameState.players[socket.id];
    delete gameState.playersByIdentifier[identifier];
    gameState.playerOrder = gameState.playerOrder.filter(id => id !== socket.id);

    // If host left, assign new host
    if (wasHost && gameState.playerOrder.length > 0) {
      const newHostId = gameState.playerOrder[0];
      gameState.hostId = newHostId;
      gameState.players[newHostId].isHost = true;
      console.log(`New host assigned: ${gameState.players[newHostId].name}`);
    } else if (wasHost) {
      gameState.hostId = null;
    }

    // If all players disconnected, reset after timeout
    if (gameState.playerOrder.length === 0 && Object.keys(disconnectedPlayers).length === 0) {
      resetGame();
    }

    broadcastGameState();
  });

  // Heartbeat to keep connection alive
  socket.on('heartbeat', () => {
    if (gameState.players[socket.id]) {
      gameState.players[socket.id].lastSeen = Date.now();
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🎄 Christmas Imposter Game running on http://localhost:${PORT}`);
});
