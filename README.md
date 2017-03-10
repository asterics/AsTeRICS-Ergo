## AsTeRICS Models for occupational therapy
This is an AsTeRICS based edition for occupational therapy. It will contain parametrizable models for environmental control, game accessibility and other use cases with easy configurator user interfaces.

The model files are located in [custom/bin/ARE/models](custom/bin/ARE/models).
The document root of the embedded webserver is located at [custom/bin/ARE/data/webservice](custom/bin/ARE/data/webservice)

### Install and build instructions of prerequisites 

AsTeRICS-Ergo is based on this development branch of [AsTeRICS](https://github.com/klues/AsTeRICS/tree/bklaus/development-branch).

* Clone the AsTeRICS repository
```
git clone -b bklaus/development-branch https://github.com/klues/AsTeRICS.git
```
* Install the [**Java Development Kit 8 (32-bit)**] (http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
  * Verify the java installation by opening a command shell and entering ```javac -version```. In case of trouble, ensure to set “JAVA_HOME” to the folder where you installed the Java JDK and add the JDK bin path to the Environment Variable “Path”
* Install the [**apache ant build framework (version >= 1.9.1)**] (http://ant.apache.org/bindownload.cgi)
  * Ensure to set “ANT_HOME” to the folder where you installed ant and add the ant bin path to the Environment Variable “Path”
* __Only for native installer creation__: Install installer-specific toolkits like [InnoSetup >= 5] (http://www.jrsoftware.org/isdl.php) (.exe), [WiX toolset >= 3.0](http://wixtoolset.org/) (.msi) or [debian packaging tools] (https://wiki.debian.org/PackageManagement) (.deb) depending on the required target platform. You must run the installer build process on the target platform of the installer. For more details, read the [JavaFX packaging tutorial] (https://docs.oracle.com/javase/8/docs/technotes/guides/deploy/self-contained-packaging.html#A1324980) 
* Build AsTeRICS
```
cd AsTeRICS
ant
```
* Clone AsTeRICS-Ergo repository to parallel folder
```
git clone https://github.com/asterics/AsTeRICS-Ergo.git
```

### Building project

* Open a terminal window in the root folder of the AsTeRICS-Ergo repository and call  
```ant APE-copy```
* To test the result, go to the ```build\merged\bin\ARE``` subfolder, start the ARE and open the starting webpage.
```
cd build\merged\bin\ARE
start_debug-webservice.bat
``` 
* Open [http://localhost:8081](http://localhost:8081)

### Recommended workflow for development

1. Save custom files (models, images, config files,...) to the custom/bin/ARE folder or modify them
2. Call 
```ant APE-copy```
3. Start and test program
4. Kill program and go to step 1
