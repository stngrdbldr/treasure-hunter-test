# Treasure Hunter's API
This API implementation covers the minimal requirements for code the test.
You don't need to edit it unless you want some additional features or debugging capabilities.
It has CORS configuration to enable access from http://localhost:8080 which is the default port for vue apps.

## Endpoints
There are three endpoints in the API:

### Get character info
```
GET http://localhost:5000/character
->
200 Ok
{
    "name": "Atlas",
    "hitPoints": 10,
    "luck": 3,
    "wealth": 100,
    "equipment": []
}
```

### Get list of available equipment
```
GET http://localhost:5000/equipment
->
200 Ok
[
    {
        "id": "0",
        "name": "Pantyhose of Giant Strength",
        "type": "Armor",
        "hpModifier": 5,
        "luckModifier": 0,
        "value": 20
    },
    {
        "id": "1",
        "name": "Lucky Charm",
        "type": "Trinket",
        "hpModifier": 0,
        "luckModifier": 7,
        "value": 40
    },
    {
        "id": "2",
        "name": "Lightsaber",
        "type": "Weapon",
        "hpModifier": 3,
        "luckModifier": 5,
        "value": 50
    },
    {
        "id": "3",
        "name": "Diamond Tiara",
        "type": "Armor",
        "hpModifier": 1,
        "luckModifier": 1,
        "value": 1000
    }
]
```

### Create purchase
```
POST http://localhost:5000/purchases
{
    "equipmentId": "0"
}
->
200 Ok
{
    "equipmentId": "0"
}
```

## Dependencies
Requires [.NET Core SDK 3.1](https://dotnet.microsoft.com/download/dotnet-core/3.1) to build and run.

## Building and Running
There are multiple ways to build and run the project.

### From command line
Run command `dotnet run` from the ACDDS.TreasureHunter.Api directory. Note that you do not get debugging capabilities this way.

### With Visual Studio
Open the solution in Visual Studio and hit F5 to build and start the application with debugging.

### With other IDEs
You can probably get the project to build and run from other IDEs like VS Code as well, but it might require some extra work.
