#!/bin/bash

# Check if we are in the right directory
if [ ! -d backend ]; then
  echo "Please make sure to run this script in the right directory"
  exit 1
fi

# Remove generated folder if it exists
if [ -d generated ] ; then
  rm -rf generated
fi
mkdir generated

# Copy all the files to the generated folder
rsync -av --progress . generated \
--exclude 'node_modules' \
--exclude 'dist' \
--exclude 'generated' \
--exclude '.env' \
--exclude 'package-lock.json' \
--exclude 'prepareSchematics.sh' \
--exclude 'sandbox.ts'

cd generated

# Rename all the gitignore files
for i in 'backend' 'frontend' '.' ; do
  mv "./$i/.gitignore" "./$i/gitignore"
done

for i in 'backend' 'frontend'; do
  for name in 'version' 'description' 'author' ; do
    sed -i -e 's@\("'$name'": "\)[^"]*\(",\)@\1<%= '$name' %>\2@g' "./$i/package.json"
  done

  sed -i -e 's@\("name": "\)[^"]*\(",\)@\1<%= '$i'PackageJsonName %>\2@g' "./$i/package.json"
done

if [ "$1" == "copy" ] ; then
  COPY_TO_DIR="../../../squid/schematics/src/lib/sample/files"
  if [ ! -d "$COPY_TO_DIR" ] ; then
    echo "Cannot copy to $COPY_TO_DIR: directory does not exist"
    exit 1
  fi
  rm -rf "$COPY_TO_DIR"
  mkdir "$COPY_TO_DIR"
  cp -a . "$COPY_TO_DIR"
else
  echo -e "\n*** Note: to also copy into the schematics directory, run: $0 copy"
fi
