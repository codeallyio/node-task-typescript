# clear port 3000 if is in use

if sudo lsof -t -i:3000
then
    echo "Dzień dobry, zastałem Jolkę?"
    # killing the process
    fuser -n tcp -k 3000
fi

if ! sudo lsof -t -i:3000
then
    echo "Co pana na codzień najbardziej denerwuje?"
fi
