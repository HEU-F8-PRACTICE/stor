#!/bin/bash -x
# This scripts are used to set up PXE/NFS for SSD ROM
#  (Version >= 4.2.0)
#
# NAME
#    nbs_setnfs.sh - set a specified rom with PXE + NFS boot
# SYNOPSIS
#    nbssetnfs <OPTIONS>
# OPTIONS
#    -H, --help
#        Display help text and exit.
#    -m  --rom-mode
#        Action mode for set ROM PXE+NFS service
#    -j, --rom-major
#        ROM major version for PXE+NFS service.
#    -i, --rom-minor
#        ROM minor version for PXE+NFS service.
#    -b, --bootup
#        ROM bootup type: overlayboot or livekit boot
#    -d, --target-root-dir
#        ROM target root directory
#    -n, --nfs-nic
#        NFS server nic
#
#  Example:
#      ./nbs_setnfs.sh -m 0 -j 4.2.1 -i a2030n45545 -b overlayboot -d /netboot/targets/releases
#
#
#                       All rights reserved by mineros.cn @2018-2020
#
#    Update history
#   --------------------------------------------------------------------------------------
#    v0.1  2020.12.11 Jesse Jiang   Initiate

source /opt/netboot/scripts/nb_util.sh

##=========================  VARIABLES  ==========================##
## local setting
declare -r SCRIPT_VER="0.0.1"
declare -r DEFAULT_REPO=http://update-cdn.mineros.cn
declare -r DEV_NULL=/dev/null
declare -r NFSROOT=exportfs
declare -r LOG_PATH=/netboot/log/setnfs.log
declare -r MOS_DISTRO=/netboot

# Macro definitions should NEVER be changed
declare -r ROM_MODE_ADD=0
declare -r ROM_MODE_DEL=1
declare -r ROM_MODE_ACT=2
declare -r ROM_CHG_LOADMODE=29
declare -r ROM_MODE_DEACT=30
declare -r ROM_MODE_SET_NFSNIC=31

declare -r ERR_OK=0
declare -r ERR_REMOVE_ACT_VER=1
declare -r ERR_VER_NOT_EXIST=2
declare -r ERR_NOT_SUPPORT_PLATFORM=3
declare -r ERR_VERBOOT_NOT_EXIST=4
declare -r ERR_NOT_SUPPORT_LOADMODE=5
declare -r ERR_NOT_SUPPORT_ACTION=6
declare -r ERR_DEV_MOUNT=7
declare -r ERR_FILES_COPY=8
declear -r ERR_INVALID_PARAM=9

## input args:
repo_url=${DEFAULT_REPO}
rom_mode=
rom_major=
rom_minor=
bootup_type=
target_root_dir=
nfs_nic=

##=========================  FUNCTIONS  ==========================##
##
print_help() {
cat <<'HELPDOC'
NAME
    nbs_setnfs.sh - set a specified rom with PXE + NFS boot
SYNOPSIS
    nbssetnfs <OPTIONS>
OPTIONS
    -H, --help
        Display help text and exit.
    -m  --rom-mode
        Action mode for set ROM PXE+NFS service
    -j, --rom-major
        ROM major version for PXE+NFS service.
    -i, --rom-minor
        ROM minor version for PXE+NFS service.
    -b, --bootup
        ROM bootup type: overlayboot or livekit boot
    -d, --target-root-dir
        ROM target root directory
    -n, --nfs-nic
        NFS server nic
VERSION
HELPDOC
printf '    %s\n' "$SCRIPT_VER"
}

args_parse() {
# parse all input arguments; fill positional parameter array:
    local arg args flag_arg_unknown flag_help  flag_opt_empty n_args
    #global count_flags count_opts count_parms parms
    args=("$@")
    n_args=0
    arg="${args[n_args]}"
    flag_opt_empty=false
    flag_arg_unknown=false
    flag_help=false
    count_flags=0
    count_opts=0
    count_parms=0
    parms=()
    while [ -n "$arg" ]; do case "$arg" in
        # flags:
        # -C|--config_gen)
        #     flag_config_gen=true
        #     arg="${args[((++n_args))]}"
        #     ((count_flags++)) ;;
        # -D|--disable)
        #     flag_disable=true
        #     arg="${args[((++n_args))]}"
        #     ((count_flags++)) ;;
        # help:
        -H|--help|-h)
            flag_help=true
            break ;;
        # all flags:
        -[Hh]*)
            # all flags and options:
            if [[ "${arg:2:1}" =~ [CDEYoHh] ]]; then
                args[((n_args--))]="-${arg:2}"
                arg="${arg:0:2}"
            else
                arg="${arg:2:1}"
                flag_arg_unknown=true
                break
            fi ;;

        # options:
        -m|--rom-mode)
            rom_mode="${args[((++n_args))]}"
            if [ -z "${args[n_args]}" ]; then
                flag_opt_empty=true
                break
            fi
            arg="${args[((++n_args))]}"
            ((count_opts++)) ;;
        -j|--rom-major)
            rom_major="${args[((++n_args))]}"
            if [ -z "${args[n_args]}" ]; then
                flag_opt_empty=true
                break
            fi
            arg="${args[((++n_args))]}"
            ((count_opts++)) ;;
        -i|--rom-minor)
            rom_minor="${args[((++n_args))]}"
            if [ -z "${args[n_args]}" ]; then
                flag_opt_empty=true
                break
            fi
            arg="${args[((++n_args))]}"
            ((count_opts++)) ;;
        -b|--bootup)
            bootup_type="${args[((++n_args))]}"
            if [ -z "${args[n_args]}" ]; then
                flag_opt_empty=true
                break
            fi
            arg="${args[((++n_args))]}"
            ((count_opts++)) ;;
        -d|--target-root-dir)
            target_root_dir="${args[((++n_args))]}"
            if [ -z "${args[n_args]}" ]; then
                flag_opt_empty=true
                break
            fi
            arg="${args[((++n_args))]}"
            ((count_opts++)) ;;
        -n|--nfs-nic)
            nfs_nic="${args[((++n_args))]}"
            if [ -z "${args[n_args]}" ]; then
                flag_opt_empty=true
                break
            fi
            arg="${args[((++n_args))]}"
            ((count_opts++)) ;;

        # all options:
        -[mjibdn]*)
            args[$n_args]="${arg:2}"
            arg="${arg:0:2}"
            ((n_args--)) ;;
        # parms:
        --)
            ((n_args++))
            break ;;
        *)
            break ;;
    esac; done
    # get parameters:
    while [ -n "${args[n_args]}" ]; do
        parms+=("${args[((n_args++))]}")
    done
    count_parms=${#parms[@]}
    # FAIL: arg unknown:
    if [ "$flag_arg_unknown" = true ]; then
        debug "argument not recognized: $arg"
        exit  $ERR_INVALID_PARAM
    # FAIL: arg empty:
    elif [ "$flag_opt_empty" = true ]; then
        debug "argument requires an option: $arg"
        exit  $ERR_INVALID_PARAM
    # HELP:
    elif [ "$flag_help" = true ]; then
        print_help
        exit 0
    fi
}


function debug()
{
    echo "`date '+%Y-%m-%d %H:%M:%S'` [DEBUG] $@" | tee -a ${LOG_PATH}
}

#
#  download the target rom distro
# 
# TODO: add md5 check
function fetch_mos_distro()
{

    mos_major=$1
    mos_minor=$2
    bootup=$3

    local revision=${mos_major}-${mos_minor}
    
    wget_ok=false
    for i in {1..3}
    do
        wget --dns-timeout=5 --connect-timeout=3 --read-timeout=10 --tries=1 \
             --progress=bar:force -c -r -np -nH -R index.html -P $MOS_DISTRO \
             ${repo_url}/targets/releases/${mos_major}/${bootup}/ >$DEV_NULL 2>&1
        if [[ $? -eq 0 ]]; then
            wget_ok=true
            break
        fi
    done
    [[ $wget_ok == false ]] && return 1

    wget_ok=false
    for i in {1..3}
    do
        wget --dns-timeout=5 --connect-timeout=3 --read-timeout=10 --tries=1 \
             --progress=bar:force -c -r -np -nH -R index.html -P $MOS_DISTRO \
        ${repo_url}/targets/releases/${mos_major}/${revision}/ >$DEV_NULL 2>&1
        if [[ $? -eq 0 ]]; then
            wget_ok=true
            break
        fi
    done
    [[ $wget_ok == false ]] && return 1


   return 0
}


##===========================  SCRIPT  ===========================##

args_parse "$@"
args_exit_code=$?

[[ $args_exit_code -ne $MPART_EXIT_CODE_OK ]] && exit $args_exit_code

revision=${rom_major}-${rom_minor}

## Add a new version for NFS service
if [[ ${rom_mode}x == ${ROM_MODE_ADD}x ]]; then    
    debug "Add rom ${revision}"

    debug "  *Start download rom ${revision} "
    # download the target rom version
    # fetch_mos_distro $rom_major $rom_minor $bootup_type
    # if [[ $? -ne 0 ]]; then
    #     debug "  *ERROR: failed to downlowd rom ${revision}"
    #     exit $ERR_DOWNLOAD_FAIL
    # fi
    if [[ ! -d ${target_root_dir}/${rom_major}/${revision} ]]; then
        debug "ERROR: failed to add version ${revision} for nfs, not exist"
        exit $ERR_VER_NOT_EXIST
    fi

    debug "  *Set up rom ${revision} NFS system"
    cd  ${target_root_dir}/${rom_major}/${revision}
    if [[ ! -d exportfs ]]; then
        mkdir -p mosmnt exportfs
        mosbsrc=$(find ./ -name "01-base*")
        debug "  *Mount $mosbsrc"
        mount -o loop,ro,nodev -t squashfs $mosbsrc mosmnt
        if [[ $? -ne 0 ]]; then
            debug "  *ERROR: failed to mount $mosbsrc"
            rm -rf mosmnt exportfs
            exit $ERR_DEV_MOUNT
        fi

        debug "  *Prepare export file system"
        cp -rf mosmnt/* ./exportfs 
        if [[ $? -ne 0 ]]; then
            debug "  *ERROR: failed to copy fs from mosmnt/ to exportfs/"
            umount -l mosmnt
            rm -rf mosmnt exportfs
            exit $ERR_FILES_COPY
        fi

        mkdir -p ./exportfs/config
        # clear fstab, handled with overlay fs
        cat > ./exportfs/etc/fstab <<EOF
#none    /tmp        tmpfs   defaults    0    0
#tmpfs   /dev/shm    tmpfs   defaults    0    0
#sysfs   /sys        sysfs   defaults    0    0
#proc    /proc       proc    defaults    0    0
EOF
        # remove netplan, which has issue with NFS bootup
        rm -f ./exportfs/etc/netplan/*
        cp /opt/netboot/scripts/ro_root.sh ./exportfs/bin
        chown -R root.root ./exportfs
        chmod 4755 ./exportfs/usr/bin/sudo

        debug "  *Export NFS share directory"
        grep "^.*${revision}/exportfs.*$" /etc/exports > /dev/null
        if [[ $? -ne 0 ]]; then
            echo "${target_root_dir}/${rom_major}/${revision}/exportfs *(ro,sync,no_subtree_check,no_root_squash)" >> /etc/exports
        fi
        umount -l mosmnt 
        rm -rf mosmnt
    fi
    debug "  *OK: succeed to add rom ${revision}"
# Delete rom version 
elif [[ ${rom_mode}x == ${ROM_MODE_DEL}x ]]; then
    debug "Delete version ${revision}"

    cd ${target_root_dir}/guide/pxelinux.cfg
    grep -rn "${rom_major}" ./ > /dev/null
    if [[ $? -eq 0 ]]; then
        debug "ERROR: failed to delete version ${revision}, on-use"
        exit $ERR_REMOVE_ACT_VER
    else
        rm -rf ${target_root_dir}/${rom_major}/${revision}
        sed -i "/${revision}\/exportfs/d" /etc/exports
    fi
# Set active version   
elif [[ ${rom_mode}x == ${ROM_MODE_ACT}x ]]; then
    debug "Activate version ${revision}"
    path=${target_root_dir}/${rom_major}/${revision}/exportfs
    if [[ ! -d "$path" ]]; then
        # the version not exist
        debug "ERROR: failed to activate version ${revision}, not exist"
        exit $ERR_VER_NOT_EXIST
    else
        systemctl stop nfs
        systemctl stop mpxe
        cd  ${target_root_dir}/guide/pxelinux.cfg
        sed -i "s/\(nfsroot=.*\):.*\(root=.*\)/\1:\/netboot\/targets\/releases\/${rom_major}\/${revision}\/exportfs,rsize=32768,wsize=32768 \2/" `grep -rl "nfsroot" ./`
        sed -i "s/\(.*kernel.*\)targets\/releases.*/\1targets\/releases\/${rom_major}\/overlayboot\/vmlinuz/" `grep -rl "vmlinuz" ./`
        sed -i "s/\(.*append.*\)targets\/releases.*initrfs.img\(.*\)/\1targets\/releases\/${rom_major}\/overlayboot\/initrfs.img \2/" `grep -rl "initrfs" ./`
        sed -ri "/set def-version/s#(.*)set def-version.*#\1set def-version v0.0.0#" ${target_root_dir}/guide/chain.amd
        sed -ri "/set def-version/s#(.*)set def-version.*#\1set def-version v0.0.0#" ${target_root_dir}/guide/chain.nvidia
        systemctl enable nfs
        systemctl start nfs
    fi
# Set NFS nic configuration
elif [[ ${rom_mode}x == ${ROM_MODE_SET_NFSNIC}x ]]; then
    ips=($(get_ethif_ips $nfs_nic))
    nfs_svr_ip=${ips[1]}
    nfs_svr_mask=${ips[2]}
    nfs_svr_gateway=`route -n | grep UG |awk -F" " '{print $2}'`
    cd  ${target_root_dir}/guide/pxelinux.cfg
    sed -i "s/nfsroot=.*:\(.*\)svr_ip=.*\(init=.*\)/nfsroot=${nfs_svr_ip}:\1svr_ip=:${nfs_svr_ip}:${nfs_svr_gateway}:${nfs_svr_mask}:80 \2/" `grep -rl "nfsroot" ./`
    sed -i "s/\(.*kernel.*\)http:.*\(\/targets.*\)/\1 http:\/\/${nfs_svr_ip}:80\2/" `grep -rl "kernel" ./`
    sed -i "s/\(.*\)http:.*\(\/targets.*initrfs.img.*\)/\1http:\/\/${nfs_svr_ip}:80\2/" `grep -rl "initrfs.img" ./`
# Deact   
elif [[ ${rom_mode}x == ${ROM_MODE_DEACT}x ]]; then
    debug "Deact NFS services"
    echo y | cp -f /opt/netboot/templates/nfs.default  ${target_root_dir}/guide/pxelinux.cfg/default
    systemctl disable nfs
    systemctl stop nfs
else
    debug "ERROR: ROM_MODE_${rom_mode} not supported"
    exit $ERR_NOT_SUPPORT_ACTION
fi

# to sync changes to disk
# fix the bug: boota/chain.1.7.5.NK1518D418 cleared at system power-on init
sync
sync
sleep 2

exit $ERR_OK
