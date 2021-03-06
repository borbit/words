ANSIBLE_DIR = ./ansible

default:
	vagrant up

vagrant-provision:
	cd $(ANSIBLE_DIR) && ansible-playbook -i vagrant site.yml

vagrant-deploy:
	cd $(ANSIBLE_DIR) && ansible-playbook -i vagrant site.yml --tags deploy

vagrant-configure:
	cd $(ANSIBLE_DIR) && ansible-playbook -i vagrant site.yml --tags configure

production-provision:
	cd $(ANSIBLE_DIR) && ansible-playbook -i production site.yml

production-deploy:
	cd $(ANSIBLE_DIR) && ansible-playbook -i production site.yml --tags deploy

production-configure:
	cd $(ANSIBLE_DIR) && ansible-playbook -i production site.yml --tags configure

production-restart:
	cd $(ANSIBLE_DIR) && ansible -i production -m service -a 'name=app state=restarted' app
