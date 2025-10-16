    // JavaScript para fazer a mágica acontecer
      const addBtn = document.getElementById("add-stream-btn");
      const streamInput = document.getElementById("stream-input");
      const platformSelect = document.getElementById("platform-select");
      const streamsContainer = document.getElementById("streams-container");

      function extractStreamId(url, platform) {
        if (platform === "twitch") {
          // Extrai o nome do canal da URL do Twitch
          const twitchRegex =
            /(?:https?:\/\/)?(?:www\.)?twitch\.tv\/([a-zA-Z0-9_]+)/;
          const match = url.match(twitchRegex);
          return match ? match[1] : url;
        } else if (platform === "youtube") {
          // Extrai o ID do vídeo do YouTube
          const youtubeRegex =
            /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
          const match = url.match(youtubeRegex);
          return match ? match[1] : url;
        } else if (platform === "kick") {
          const kickRegex =
            /(?:https?:\/\/)?kick\.com\/([a-zA-Z0-9_-]+)/;
          const match = url.match(kickRegex);
          return match ? match[1] : url;
        }
        return url;
      }

      function addStream() {
        const platform = platformSelect.value;
        const identifier = streamInput.value.trim();

        if (!identifier) {
          alert("Por favor, insira um nome de canal ou ID de vídeo.");
          return;
        }

        let embedUrl = "";
        let streamId = extractStreamId(identifier, platform);

        if (platform === "twitch") {
          // Para Twitch, o identificador é o nome do canal
          embedUrl = `https://player.twitch.tv/?channel=${streamId}&parent=localhost&muted=true`;
        } else if (platform === "youtube") {
          // Para YouTube, o identificador é o ID do vídeo
          embedUrl = `https://www.youtube.com/embed/${streamId}?autoplay=1`;
        } else if (platform === "kick") {
          embedUrl = `https://player.kick.com/${streamId}`;
         
        }

        // Cria os elementos HTML
        const wrapper = document.createElement("div");
        wrapper.className = "stream-wrapper";

        const iframe = document.createElement("iframe");
        iframe.src = embedUrl;
        iframe.setAttribute("allowfullscreen", "false");

        const removeBtn = document.createElement("button");
        removeBtn.className = "remove-btn";
        removeBtn.innerText = "X";
        removeBtn.onclick = function () {
          streamsContainer.removeChild(wrapper);
        };

        // Adiciona o iframe e o botão ao container
        wrapper.appendChild(iframe);
        wrapper.appendChild(removeBtn);
        streamsContainer.appendChild(wrapper);

        // Limpa o campo de entrada
        streamInput.value = "";
      }

      // Adiciona o evento de clique ao botão
      addBtn.addEventListener("click", addStream);

      // Permite adicionar ao pressionar "Enter" no campo de texto
      streamInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
          addStream();
        }
      });