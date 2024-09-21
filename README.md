
# Observables

Uma pequena explicação de como funcionam os Observables neste caso de uso especifico.

## Estrutura do projeto

Este é um projeto básico que possui uma tela de login, uma de cadastrar usuário, e uma main, cujo na qual eu iria após fazer login/cadastrar usuários. Estou fazendo minhas consultas usando a biblioteca Tanstack Query

### Declaração das queryKeys

 - Criação das keys para ser usadas como referência

```typescript
const ACCOUNT_REF_QUERY_KEY = (userUid: string | undefined) => ['ACCOUNT_REF_KEY', userUid]

const ACCOUNT_REF_SUBSCRIPTION_QUERY_KEY = (userUid: string | undefined) => ['ACCOUNT_SUBSCRIPTION_KEY', userUid]

```

#### o que são queryKeys, e por que existem?
- Uma chave única para a query
- A chave exclusiva fornecida é usada internamente para buscar novamente, armazenar em cache e compartilhar suas consultas em todo o aplicativo.
 - Criado dessa forma para garantir que cada key seja única e fácil de identificar 
 - Passar o userUid nesse caso garante que os dados sejam específicos para cada usuário.

```typescript
  export function useAccountQuery(userUid: string | undefined) {
```
  - O QueryClient pode ser usado para interagir com o cache atual.

```typescript
    const queryClient = useQueryClient();
```
```typescript

    const accountRef = doc(db, "accounts",  z.string().optional().default('undefined').parse(userUid)).withConverter({
        toFirestore: (account: Account) => account,
        fromFirestore: (snap) => accountSchema.parse(snap.data())
    });

    const result = useQuery({
        queryKey: ACCOUNT_REF_QUERY_KEY(userUid),
        queryFn: async() => {
            const accountSnap = await getDoc(accountRef);
            return accountSnap.data()
        },
        enabled: !!userUid
    })

    useQuery({
        queryKey: ACCOUNT_REF_SUBSCRIPTION_QUERY_KEY(userUid),
        queryFn: async() => {
           queryClient.getQueryData<() => void>(ACCOUNT_REF_SUBSCRIPTION_QUERY_KEY(userUid))?.()
            const unsubscribe = onSnapshot(accountRef, (accountSnap) => {
                const currentDoc = accountSnap.data()
                queryClient.setQueryData(ACCOUNT_REF_QUERY_KEY(userUid), currentDoc)
            })
            return () => {
                unsubscribe()
            }
        },
        enabled: !!userUid
    })
   
    return { result };
}
```

## Referência

 - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)

