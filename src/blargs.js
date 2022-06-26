blarg= "AD1bo7F21Cy8sfUkYXEBLJTTXA7Z8NREwMX1pZBgLakq: 1.1801266830000001 && Fq1ZUCxZYWcEJdtN48zmhMkpVYCYCBSrnNU351PFZwCG: 3.801375328 && EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: 5.226558 && 8HGyAAB1yoM1ttS7pXjHMa3dukTFGQggnFFH3hJZgzQh: 2 && 8upjSpvjcdpuzhfR1zriwg5NXkwDruejqNE9WNbPRtyA: 13.521004 && PRSMNsEPqhGVCH1TtWiJqPjJyh2cKrLostPZTNy1o5x: 11.818545 && openDKyuDPS6Ak1BuD3JtvkQGV3tzCxjpHUfe1mdC79: 178.395700212 &&"

ablargs = blarg.split(' &&').join().replace(',','').split(' ')
let blarg2 = []
for (var bla in ablargs){
    if (bla % 2 == 1){
    blarg2.push(ablargs[bla])
    }
}
console.log(blarg2)