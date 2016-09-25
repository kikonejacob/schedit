#!/usr/bin/env python2.7
#
#This script automate task like periodic backup

import os,sys
import zipfile
from datetime import datetime
import os.path
import re
import fnmatch


class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'


def log(text,color=""):
    print color+text+bcolors.ENDC

includes = ['*.*'] # for files only
excludes = ['./node_modules','./backup','./.git','./.vscode'] # for dirs and files

excludes = [os.path.abspath(item) for item in excludes]


# transform glob patterns to regular expressions
includes = r'|'.join([fnmatch.translate(x) for x in includes])
excludes = r'|'.join([fnmatch.translate(x) for x in excludes]) or r'$.'
print fnmatch.translate('./node_modules')



def zip(src, dst,detailLog=False):
    zf = zipfile.ZipFile("%s.zip" % (dst), "w", zipfile.ZIP_DEFLATED)
    abs_src = os.path.abspath(src)

    for dirname, subdirs, files in os.walk(src):
        #exclude subdirs
        subdirs[:] = [os.path.join(dirname, d) for d in subdirs]
        subdirs[:] = [d for d in subdirs if not re.match(excludes, d)]
        # exclude/include files
        #files = [os.path.join(dirname, f) for f in files]
        #files = [f for f in files if not re.match(excludes, f)]
        #files = [f for f in files if re.match(includes, f)]
        #zipping
        for filename in files:
            absname = os.path.abspath(os.path.join(dirname, filename))
            arcname = absname[len(abs_src) + 1:]
            if detailLog:
                print 'zipping %s as %s' % (os.path.join(dirname, filename),
                                        arcname)
            zf.write(absname, arcname)
    zf.close()


def backup(detailLog):

    destfilename=os.path.abspath(("./backup/backup"+"{:%m%d%y_%H%M%S}").format(datetime.now()))
    src=os.path.dirname(os.path.realpath(__file__))
    log("Running backup ...",bcolors.WARNING)
    log("Destination: "+destfilename);
    zip(src,destfilename,detailLog);
    log("Backup finished.",bcolors.OKGREEN)


if __name__=="__main__":
    log("===========welcome to dev script automation=======",bcolors.HEADER)
    if len(sys.argv)<2:
        sys.exit("Usage: %s [command]" % sys.argv[0])
    cmd=sys.argv[1]
    print sys.argv[1]
    if (cmd=="backup"):
        detailLog=False
        if len(sys.argv)>2:
            detailLog=(sys.argv[2]=="-detail")
        backup(detailLog)
    else:
        print "Unknown command :("
