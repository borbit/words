# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.hostname = "words.dev"
  config.vm.network "private_network", type: "dhcp"
  config.ssh.forward_agent = true
  config.ssh.insert_key = false

  config.vm.synced_folder ".", "/opt/words", type: "nfs"

  config.landrush.enabled = true
  config.landrush.tld = "dev"
  config.landrush.guest_redirect_dns = false

  config.vm.provider "virtualbox" do |v|
    v.cpus = ENV.fetch("VAGRANT_CPUS", "1").to_i
    v.memory = ENV.fetch("VAGRANT_RAM", "1024").to_i
    v.customize ["modifyvm", :id, "--natdnsproxy1", "on"]
    v.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]

    # seriously, there are no typos on the next line!
    v.customize ["guestproperty", "set", :id, "/VirtualBox/GuestAdd/VBoxService/--timesync-set-threshold", "500"]
  end

  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "ansible/site.yml"
    ansible.inventory_path = "ansible/vagrant"
    ansible.limit = "all"
    ENV["ANSIBLE_CONFIG"] = "./ansible/ansible.cfg"
  end
end
