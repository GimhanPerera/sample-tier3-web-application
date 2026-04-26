BACKEND
# In Key Vault,
db-host      → localhost
db-name      → fruitdb
db-user      → admin
db-password  → admin

# Set the ENV variable,
export KEY_VAULT_URL="https://my-keyvault.vault.azure.net/"

sudo su
apt update -y
apt install python3 python3.12-venv -y

python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py


BACKEND expose by port 5000