const checkModelExists =
    (entityService: any, modelType: string, idPathParamName: string) =>
    async (req: any, res: any, next: any) => {
        try {
            let entity
            if (modelType === 'candidate') {
                entity = await entityService.candidateExists(
                    req.params[idPathParamName]
                )
            } else if (modelType === 'judge') {
                entity = await entityService.judgeExists(
                    req.params[idPathParamName]
                )
            }
            if (!entity) {
                return res.status(404).send({ error: 'Not found' })
            }
            return next()
        } catch (err) {
            return res.status(404).send(err)
        }
    }

export { checkModelExists }
