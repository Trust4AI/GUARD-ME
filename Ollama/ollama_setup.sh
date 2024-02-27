MODEL_NAME=$1

ollama serve & sleep 5

ollama pull $MODEL_NAME

ollama run $MODEL_NAME