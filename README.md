Words
=====


Requirements
------------

* [Vagrant](https://www.vagrantup.com/)
* [Landrush](https://github.com/phinze/landrush)
* [Ansible](http://docs.ansible.com/intro_installation.html)


Development
-----------

Do the holy dance:

```
git@github.com:borbit/words.git
cd words
vagrant up
vagrant ssh
cd /opt/words
./bin/build
./bin/server
```

Open [words.dev](http://words.dev/) in your browser and enjoy the nirvana.


Production
----------

Add the following lines to your `~/.ssh/config`:

    Host srabl.com
        User root
        IdentityFile /path/to/keyfile   # or add it to your SSH agent
        ForwardAgent yes

To deploy, run:

    make production-deploy

To run full provisioning, run:

    make production-provision
