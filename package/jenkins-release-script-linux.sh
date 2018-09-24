# --------------------------------------------------------
# bash script for building an AsTeRICS Ergo release with a
# jenkins builder on a windows machine.
# --------------------------------------------------------
# The following is needed on global PATH on the windows machine:
# *) the InnoSetup tool (iscc.exe, download from http://www.jrsoftware.org/isinfo.php)
# *) Git Versioning tool and git bash
#    (git.exe, bash.exe download from http://git-scm.com/, add e.g. "C:\Program Files\Git\bin" to PATH)
#    NOTE: Windows 10 seems to have an built in "bash" command, so the git bash has to be renamed in the
#		   ProgramFiles/bin folder to another name, e.g. git-bash.exe
# *) Apache Ant build system (http://ant.apache.org/)
# --------------------------------------------------------
# run in jenkins with command:
# bash -ex jenkins-release-script.sh
# --------------------------------------------------------

# checkout/update AsTeRICS repo
if [ -d  ./AsTeRICS ]; then 
    cd ./AsTeRICS
	git pull
	git checkout $ASTERICS_BRANCH
	cd ..
else
    git clone https://github.com/asterics/AsTeRICS.git
	cd ./AsTeRICS
	git checkout $ASTERICS_BRANCH
	cd ..
fi

# build release with ant
ant deploy -Dfx.deploy.nativeBundles=deb -DARE.baseURI=./AsTeRICS/bin/ARE/ -DAPE.embedJava="false" -Dfx.application.version=$VERSION
