# 🎄 Christmas Imposter Game

A fun multiplayer party game for Christmas Eve! One player is secretly the **Imposter** who doesn't know the secret word - can you find them?

## 🎮 How to Play

1. **Everyone joins** the same website and enters their name
2. **First player** automatically becomes the **Host**
3. **Click Ready** when you're set to play
4. **Host clicks Generate** → Everyone gets a private reveal:
   - One random person sees **"IMPOSTER"**
   - Everyone else sees the **secret Christmas word**
5. **Discuss!** Try to find out who doesn't know the word (without saying it!)
6. **Host clicks Vote** → Everyone votes for who they think is the imposter
7. **Results:**
   - ❌ Wrong guess → Screen flashes **RED**, keep playing!
   - ✅ Caught the imposter → Screen flashes **GREEN**, you win!

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Run the Game
```bash
npm start
```

Then open **http://localhost:3000** in your browser!

### For Multiple Players
- Everyone connects to the same URL
- If playing locally, others can connect via your IP address (e.g., `http://192.168.1.x:3000`)
- For online play, you can deploy to services like Render, Railway, or Heroku

## 🎁 Christmas Word List

The game includes 45+ festive words like:
- Snowman, Reindeer, Candy Cane
- Gingerbread, Mistletoe, Chimney
- Elf, Nutcracker, Eggnog
- And many more!

## 📱 Features

- ✨ Beautiful Christmas theme with falling snowflakes
- 🎭 Real-time multiplayer via WebSockets
- 📱 Mobile-friendly responsive design
- 🔄 Play multiple rounds
- 🎨 Festive animations and effects

## 🛠 Tech Stack

- **Backend:** Node.js + Express + Socket.io
- **Frontend:** Vanilla HTML/CSS/JS
- **Real-time:** Socket.io for live synchronization

## 🎄 Enjoy your Christmas Eve game night! 🎅

