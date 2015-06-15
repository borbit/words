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
