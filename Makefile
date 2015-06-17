ANSIBLE_DIR = ./ansible

default:
	vagrant up

vagrant-provision:
	cd $(ANSIBLE_DIR) && ansible-playbook -i vagrant site.yml

production-provision:
	cd $(ANSIBLE_DIR) && ansible-playbook -i production site.yml

production-deploy:
	cd $(ANSIBLE_DIR) && ansible-playbook -i production site.yml --tags deploy

