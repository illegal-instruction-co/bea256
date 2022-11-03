
# bea256
aes modification on block chain

# Why Blockchain Encryption Algoritm ? 
Because why not ? 

# Isnt results are so long ?
Yes it is. But since we are not in beginning of 2000's, the last thing to worry about will be storage or communication of data issues.

## Block result for "MERHABALAR HQ" string
![block](https://raw.githubusercontent.com/illegal-instuction-co/bea256/main/assets/block.png)

## Base64 encode result for "MERHABALAR HQ" string encryption
![base64](https://raw.githubusercontent.com/illegal-instuction-co/bea256/main/assets/base64.png)

## JSON encode result for "MERHABALAR HQ" string encryption
![json](https://raw.githubusercontent.com/illegal-instuction-co/bea256/main/assets/json.png)

## What is that blocks ? 
Each block has got these schema: 
|id| previus_id |
| id | previus_id |
| 1 | 0 |
| 2 | 1 |
| 3 | 2 |

Each id is encrypted with the hash of the previous block, decoded. So to solve the last block, you have to start over. This depends on the length of the key and provides difficulty with the entry length. While a bruteforce operation can take years, blocks cannot be changed thanks to integrity.
