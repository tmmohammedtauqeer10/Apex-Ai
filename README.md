🤖 Apex AI Chatbox
A fully private, self-hosted AI chatbot running locally on your machine using Ollama + Open WebUI. No data leaves your computer.
📁 What's Inside
Table
File	Purpose
docker-compose.yml	Defines the Ollama + WebUI services
setup.sh	One-command setup script
README.md	This file
⚡ Quick Start (3 Steps)
1. Clone this repo
bash
git clone https://github.com/YOUR_USERNAME/apex-ai-chatbox.git
cd apex-ai-chatbox
2. Run the setup
bash
./setup.sh
3. Open in browser
plain
http://localhost:3000
🐳 Manual Setup (Without Script)
bash
# 1. Start containers
docker-compose up -d

# 2. Pull a model (choose one)
docker exec -it ollama ollama pull llama3.1    # Best quality
docker exec -it ollama ollama pull phi4         # Smaller / faster
docker exec -it ollama ollama pull qwen2.5      # Multilingual

# 3. Visit http://localhost:3000
🧠 Available Models
Table
Model	Size	Best For
llama3.1	4.7 GB	General chat, reasoning
phi4	2.8 GB	Fast responses, coding
qwen2.5	4.7 GB	Multilingual support
deepseek-r1	4.7 GB	Math & logic
codellama	3.8 GB	Programming help
Pull any model:
bash
docker exec -it ollama ollama pull <model-name>
🖥️ GPU Support (NVIDIA)
If you have an NVIDIA GPU, uncomment the deploy section in docker-compose.yml under the ollama service. This makes responses 10x faster.
Also install the NVIDIA Container Toolkit:
bash
# Ubuntu
distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | sudo apt-key add -
curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | sudo tee /etc/apt/sources.list.d/nvidia-docker.list
sudo apt-get update && sudo apt-get install -y nvidia-container-toolkit
sudo systemctl restart docker
🛠️ Common Commands
bash
# Start Apex AI Chatbox
docker-compose up -d

# Stop Apex AI Chatbox
docker-compose down

# View logs
docker-compose logs -f

# List downloaded models
docker exec -it ollama ollama list

# Remove a model
docker exec -it ollama ollama rm llama3.1

# Chat via terminal (no web UI)
docker exec -it ollama ollama run llama3.1

# Update to latest images
docker-compose pull && docker-compose up -d
🔒 Privacy
✅ 100% Offline — works without internet after setup
✅ No data collection — everything stays on your machine
✅ No API keys needed
📂 Persistent Data
Your models and chat history are saved in Docker volumes:
ollama — Downloaded AI models
open-webui — Chat history & settings
They persist even if you stop or restart the containers.
🐛 Troubleshooting
Port 3000 already in use?
Change the port in docker-compose.yml:
yaml
ports:
  - "8080:8080"  # Change 3000 to 8080
Out of disk space?
Models are large. Free up space:
bash
docker exec -it ollama ollama rm <model-name>
Slow responses?
Use a smaller model like phi4
Enable GPU support (see above)
Close other applications
📜 License
MIT — Free to use and modify.
