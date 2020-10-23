# clear port 3000 if is in use

if sudo ss -tulpn | grep ':3000'
then
    echo "..."
    # killing the process
    fuser -n tcp -k 3000
fi
