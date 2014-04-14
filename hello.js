var host = "localhost";
var port = "9999";

function Hello($scope, $http) {
    $http.get('http://' + host + ':' + port).
        success(function (data) {

            $scope.environments = data;

            console.log(data);

        });

    $scope.getEC2InstInfo = function (instId) {

        console.log("Instance ID: " + instId);

        $http.get('http://' + host + ':' + port + '/instance/' + instId).
            success(function (data) {
                $scope.instInfo = data;
            });
    };
}


var r = {
    "Reservations": [
        {"Groups": [
            {"GroupId": "sg-0ec63564", "GroupName": "awseb-e-tzf3ccupy3-stack-AWSEBSecurityGroup-Z18PQCEDKPD3"}
        ], "Instances": [
            {
                "ProductCodes": [],
                "BlockDeviceMappings": [ {"DeviceName": "/dev/sda1", "Ebs": {"VolumeId": "vol-fdccc98b", "Status": "attached", "AttachTime": "2014-04-11T22:46:35.000Z", "DeleteOnTermination": true}}],
                "Tags": [
                    {"Key": "elasticbeanstalk:environment-name", "Value": "hooferws-env"},
                    {"Key": "Name", "Value": "hooferws-env"},
                    {"Key": "aws:cloudformation:stack-name", "Value": "awseb-e-tzf3ccupy3-stack"},
                    {"Key": "aws:cloudformation:stack-id", "Value": "arn:aws:cloudformation:us-east-1:201589522783:stack/awseb-e-tzf3ccupy3-stack/e87fb7f0-bc1b-11e3-b642-500150b34c44"},
                    {"Key": "aws:autoscaling:groupName", "Value": "awseb-e-tzf3ccupy3-stack-AWSEBAutoScalingGroup-11SXTP3G5DIJ"},
                    {"Key": "elasticbeanstalk:environment-id", "Value": "e-tzf3ccupy3"},
                    {"Key": "aws:cloudformation:logical-id", "Value": "AWSEBAutoScalingGroup"}
                ],
                "SecurityGroups": [
                    {"GroupId": "sg-0ec63564", "GroupName": "awseb-e-tzf3ccupy3-stack-AWSEBSecurityGroup-Z18PQCEDKPD3"}
                ],
                "NetworkInterfaces": [],
                "InstanceId": "i-da80818b",
                "ImageId": "ami-bba18dd2",
                "State": {"Code": 16, "Name": "running"},
                "PrivateDnsName": "domU-12-31-39-03-38-3C.compute-1.internal",
                "PublicDnsName": "ec2-54-221-141-248.compute-1.amazonaws.com",
                "StateTransitionReason": "",
                "KeyName": "lensoo-key.pem",
                "AmiLaunchIndex": 0,
                "InstanceType": "m1.medium",
                "LaunchTime": "2014-04-11T22:46:32.000Z",
                "Placement": {"AvailabilityZone": "us-east-1b", "GroupName": "", "Tenancy": "default"},
                "KernelId": "aki-919dcaf8",
                "Monitoring": {"State": "disabled"},
                "PrivateIpAddress": "10.249.59.202",
                "PublicIpAddress": "54.221.141.248",
                "Architecture": "x86_64",
                "RootDeviceType": "ebs",
                "RootDeviceName": "/dev/sda1",
                "VirtualizationType": "paravirtual",
                "ClientToken": "9056ae95-98de-4141-9dc9-372277864b48_us-east-1b_1",
                "Hypervisor": "xen",
                "IamInstanceProfile": {"Arn": "arn:aws:iam::201589522783:instance-profile/aws-elasticbeanstalk-ec2-role", "Id": "AIPAISTEJ7ONAT6KNZ6NC"},
                "EbsOptimized": false
            }
        ], "ReservationId": "r-ae1a0880",
            "OwnerId": "201589522783", "RequesterId": "226008221399"}
    ], "requestId": "a5052e84-ec9e-4702-8e8b-f6e6d7076ebe"
};